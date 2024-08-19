package com.springboot.board.photo.service;

import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.entity.PhotoReply;
import com.springboot.board.photo.repository.PhotoReplyRepository;
import com.springboot.board.photo.repository.PhotoRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class PhotoReplyService {
    private final PhotoService photoService;
    private final MemberService memberService;
    private final PhotoReplyRepository photoReplyRepository;

    public PhotoReplyService(PhotoService photoService,
                             MemberService memberService,
                             PhotoReplyRepository photoReplyRepository) {
        this.photoService = photoService;
        this.memberService = memberService;
        this.photoReplyRepository = photoReplyRepository;
    }

    public PhotoReply createPhotoReply(PhotoReply photoReply) throws IllegalAccessException {
        Photo photo = photoService.findVerifiedPhoto(photoReply.getPhoto().getPhotoId());
        Member member = memberService.findVerifiedMember(photoReply.getMember().getMemberId());

        Map<Member.Generation, List<Photo.Category>> allowCategoriesMap = Map.of(
                Member.Generation.GENERATION_8090, List.of(Photo.Category.CATEGORY_8090, Photo.Category.CATEGORY_9000),
                Member.Generation.GENERATION_9000, List.of(Photo.Category.CATEGORY_8090, Photo.Category.CATEGORY_9000, Photo.Category.CATEGORY_0010),
                Member.Generation.GENERATION_0010, List.of(Photo.Category.CATEGORY_9000, Photo.Category.CATEGORY_0010, Photo.Category.CATEGORY_1020),
                Member.Generation.GENERATION_1020, List.of(Photo.Category.CATEGORY_0010, Photo.Category.CATEGORY_1020)
        );

        List<Photo.Category> allowCategories = allowCategoriesMap.get(member.getMemberGeneration());

        if (!allowCategories.contains(photo.getCategory())) {
            throw new IllegalAccessException(
                    String.format("%s세대 회원은 %s카테고리의 게시물에만 댓글을 작성할 수 있습니다.",
                            member.getMemberGeneration().getGeneration(),
                            allowCategories.stream().map(Enum::name).collect(Collectors.joining(","))));
        }

        photoReply.setPhoto(photo);
        photoReply.setMember(member);

        return photoReplyRepository.save(photoReply);
    }

    public PhotoReply updatePhotoReply(PhotoReply photoReply) {
        PhotoReply findPhotoReply = findVerifiedPhotoReply(photoReply.getPhotoReplyId());
        Optional.ofNullable(photoReply.getBody())
                .ifPresent(body -> photoReply.setBody(body));
        return photoReplyRepository.save(findPhotoReply);
    }

    public void deletePhotoReply(long photoReplyId) {
        PhotoReply findPhotoReply = findVerifiedPhotoReply(photoReplyId);
        photoReplyRepository.delete(findPhotoReply);
    }

    public PhotoReply findVerifiedPhotoReply(long photoReplyId) {
        Optional<PhotoReply> optionalPhotoReply = photoReplyRepository.findById(photoReplyId);
        PhotoReply findPhotoReply = optionalPhotoReply.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_REPLY_NOT_FOUND));
        return findPhotoReply;
    }
}

package com.springboot.board.photo.service;

import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.repository.PhotoRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final MemberService memberService;

    public PhotoService(PhotoRepository photoRepository,
                        MemberService memberService) {
        this.photoRepository = photoRepository;
        this.memberService = memberService;
    }

    public Photo createPhoto(Photo photo) throws IllegalAccessException {
       Member member = memberService.findVerifiedMember(photo.getMember().getMemberId());

        Map<Member.Generation, List<Photo.Category>> allowCategoriesMap = Map.of(
                Member.Generation.GENERATION_8090, List.of(Photo.Category.CATEGORY_8090, Photo.Category.CATEGORY_9000),
                Member.Generation.GENERATION_9000, List.of(Photo.Category.CATEGORY_8090, Photo.Category.CATEGORY_9000, Photo.Category.CATEGORY_0010),
                Member.Generation.GENERATION_0010, List.of(Photo.Category.CATEGORY_9000, Photo.Category.CATEGORY_0010, Photo.Category.CATEGORY_1020),
                Member.Generation.GENERATION_1020, List.of(Photo.Category.CATEGORY_0010, Photo.Category.CATEGORY_1020)
        );

        List<Photo.Category> allowCategories = allowCategoriesMap.get(member.getMemberGeneration());

        if (!allowCategories.contains(photo.getCategory())) {
            throw new IllegalAccessException(
                    String.format("%세대 회원은 %s카테고리만 글쓰기가 가능합니다.",
                            member.getMemberGeneration().getGeneration(), allowCategories.stream()
                                    .map(Enum::name)
                                    .collect(Collectors.joining(",")))
            );
        }
        return photoRepository.save(photo);
    }

    public Photo updatePhoto(Photo photo) {
        Photo findPhoto = findVerifiedPhoto(photo.getPhotoId());

        Optional.ofNullable(photo.getTitle())
                .ifPresent(title -> findPhoto.setTitle(title));
        Optional.ofNullable(photo.getBody())
                .ifPresent(body -> findPhoto.setBody(body));
        Optional.ofNullable(photo.getIsNotice())
                .ifPresent(isNotice -> findPhoto.setIsNotice(isNotice));
        Optional.ofNullable(photo.getCategory())
                .ifPresent(category -> findPhoto.setCategory(category));
        Optional.ofNullable(photo.getImage1())
                .ifPresent(image1 -> findPhoto.setImage1(image1));
        Optional.ofNullable(photo.getImage2())
                .ifPresent(image2 -> findPhoto.setImage2(image2));
        Optional.ofNullable(photo.getImage3())
                .ifPresent(image3 -> findPhoto.setImage3(image3));
        Optional.ofNullable(photo.getImage4())
                .ifPresent(image4 -> findPhoto.setImage4(image4));
        Optional.ofNullable(photo.getImage5())
                .ifPresent(image5 -> findPhoto.setImage5(image5));

        return photoRepository.save(findPhoto);
    }

    public Photo findPhoto(long photoId) {
        Photo findPhoto = findVerifiedPhoto(photoId);
        findPhoto.setView(findPhoto.getView() + 1);
        return findPhoto;
    }

    public Page<Photo> findPhotos(int page, int size) {
        return photoRepository.findAll(PageRequest.of(page, size,
                Sort.by("photoId").descending()));
    }

    public Page<Photo> findPhotosSort(int page, int size, Sort sort) {
        return photoRepository.findAll(PageRequest.of(page, size, sort));
    }

    public void deletePhoto(long photoId) {
        Photo findPhoto = findVerifiedPhoto(photoId);
        photoRepository.delete(findPhoto);
    }

    public Photo findVerifiedPhoto(long photoId) {
        Optional<Photo> optionalPhoto = photoRepository.findById(photoId);
        Photo findPhoto = optionalPhoto.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PHOTO_NOT_FOUND));
        return findPhoto;
    }
}



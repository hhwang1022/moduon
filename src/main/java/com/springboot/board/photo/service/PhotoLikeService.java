package com.springboot.board.photo.service;

import com.springboot.board.photo.dto.PhotoLikeDto;
import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.entity.PhotoLike;
import com.springboot.board.photo.mapper.PhotoLikeMapper;
import com.springboot.board.photo.repository.PhotoLikeRepository;
import com.springboot.board.photo.repository.PhotoRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import net.bytebuddy.implementation.auxiliary.AuxiliaryType;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class PhotoLikeService {
    private final PhotoService photoService;
    private final MemberService memberService;
    private final PhotoLikeRepository photoLikeRepository;
    private final PhotoLikeMapper photoLikeMapper;
    private final PhotoRepository photoRepository;


    public PhotoLikeService(PhotoService photoService,
                            MemberService memberService,
                            PhotoLikeRepository photoLikeRepository,
                            PhotoLikeMapper photoLikeMapper,
                            PhotoRepository photoRepository) {
        this.photoService = photoService;
        this.memberService = memberService;
        this.photoLikeRepository = photoLikeRepository;
        this.photoLikeMapper = photoLikeMapper;
        this.photoRepository = photoRepository;
    }

    public void checkLike(PhotoLikeDto.Post likeDto) {
        Photo photo = photoService.findVerifiedPhoto(likeDto.getPhotoId());
        Member member = memberService.findVerifiedMember(likeDto.getMemberId());
        Optional<PhotoLike> optionalPhotoLike = photoLikeRepository.findAllByMemberAndPhoto(member, photo);

        if (optionalPhotoLike.isPresent()) {
            PhotoLike existLike = optionalPhotoLike.get();
            photoLikeRepository.deleteById(existLike.getPhotoLikeId());
            photo.setLikeCount(photo.getLikeCount() - 1);
        } else {
            PhotoLike photoLike = photoLikeMapper.photoLikePostDtoToPhotoLike(likeDto);
            photoLikeRepository.save(photoLike);
            photo.setLikeCount(photo.getLikeCount() + 1);
        }

        photoRepository.save(photo);
    }
}

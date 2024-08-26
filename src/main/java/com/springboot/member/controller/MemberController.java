package com.springboot.member.controller;
import com.springboot.dto.MultiResponseDto;
import com.springboot.dto.SingleResponseDto;
import com.springboot.member.dto.LoginDto;
import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import com.springboot.member.mapper.MemberMapper;
import com.springboot.member.service.MemberService;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberMapper mapper;
    private final MemberService memberService;

    public MemberController(MemberMapper mapper, MemberService memberService) {
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity patchMember(@AuthenticationPrincipal Object principal,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setEmail(principal.toString());
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
    }

    // 중복 이메일 체크
    @GetMapping("/checkemail")
    public ResponseEntity findEmail(@RequestParam String email) {
        return new ResponseEntity<>(
                memberService.isUniqueEmail(email), HttpStatus.OK);
    }

    // 중복 이름 체크
    @GetMapping("/checkname")
    public ResponseEntity findName(@RequestParam String nickname) {
        return new ResponseEntity<>(
                memberService.isUniqueNickname(nickname), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {

        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponseDtos(members), pageMembers), HttpStatus.OK
        );
    }

    @DeleteMapping
    public ResponseEntity deleteMember(@AuthenticationPrincipal Object principal) {
        memberService.deleteMember(principal.toString());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/info")
    public ResponseEntity getMember(@AuthenticationPrincipal Object principal) {
        Member member = memberService.findVerifiedMember(principal.toString());

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberInfoResponse(member)), HttpStatus.OK
        );
    }
}

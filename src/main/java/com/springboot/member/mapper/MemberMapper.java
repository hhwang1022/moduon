package com.springboot.member.mapper;

import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    @Mapping(target = "memberGeneration", source = "generation")
    Member memberPostToMember(MemberDto.Post requestBody);
//        Member memberPatchToMember(MemberDto.Patch requestBody);
//        MemberDto.Response memberToMemberResponse(Member member);
//        List<MemberDto.Response> membersToMemberResponses(List<Member> members);

    Member memberPatchToMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponseDto(Member member);

    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);
}

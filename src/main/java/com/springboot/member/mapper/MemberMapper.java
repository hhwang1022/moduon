package com.springboot.member.mapper;

import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
//        Member memberPatchToMember(MemberDto.Patch requestBody);
//        MemberDto.Response memberToMemberResponse(Member member);
//        List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}

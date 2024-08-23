package com.springboot.member.dto;

import com.springboot.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String nickname;

        @NotNull
        private Member.Generation generation;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        @Setter
        private String email;


        private String password;


        private String nickname;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long memberId;
        private String email;
        private String nickname;
        private Member.Generation memberGeneration;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InfoResponse {
        private String nickname;
        private Member.Generation memberGeneration;
        private Long votingRights;
        private List<String> roles;
    }
}

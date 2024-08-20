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
        private long memberId;


        private String password;


        private String nickname;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long memberId;
        private String email;
        private String nickname;
        private Member.Generation memberGeneration;
    }
}

package com.springboot.member.dto;

import lombok.Getter;

@Getter
public class LoginDto {
    //이메일
    private String username;
    private String password;
}

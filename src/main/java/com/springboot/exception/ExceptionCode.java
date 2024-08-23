package com.springboot.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    PASSWORD_MISMATCH(404, "Password mismatch"),
    NICKNAME_EXISTS(409, "Nickname exists"),
    COFFEE_NOT_FOUND(404, "Coffee not found"),
    COFFEE_CODE_EXISTS(409, "Coffee Code exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    BALANCEGAME_EXISTS(409, "Balancegame exists"),
    BALANCEGAME_NOT_EXISTS(404, "Balancegame not exists"),
    POST_NOT_FOUND(400, "Post not found"),
    POST_REPLY_NOT_FOUND(404, "PostReply not found"),
    PHOTO_NOT_FOUND(404, "Photo not found"),
    PHOTO_REPLY_NOT_FOUND(404, "PhotoReply not found"),
    BALANCEGAMEREPLY_NOT_FOUND(404, "balanceGameReply not found"),
    BALANCEGAME_VOTEITEM_NOT_FOUND(404, "voteItem not found"),
    BALANCEGAME_VOTE_ERROR(500, "balanceGameVote make error"),
    BALANCEGAMEREPLY_ERROR(500, "balanceGameReply make error"),
    MEMBER_DELETED(500, "member Deleted");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

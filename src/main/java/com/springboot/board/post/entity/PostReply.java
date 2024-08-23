package com.springboot.board.post.entity;

import com.springboot.audit.Auditable;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class PostReply extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postReplyId;

    @Column(nullable = false)
    private String body;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    public void setPost(Post post){
        this.post = post;
        if(!post.getPostReplyList().contains(this)) {
            post.setPostReplies(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member){
        this.member = member;
        if(!member.getPostReplies().contains(this)) {
            member.setPostReplies(this);
        }
    }
}

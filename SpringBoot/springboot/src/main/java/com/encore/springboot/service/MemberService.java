package com.encore.springboot.service;

import com.encore.springboot.exception.UserNotFoundException;
import com.encore.springboot.model.Member;
import com.encore.springboot.repo.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
    private final MemberRepo memberRepo;

    @Autowired
    public MemberService(MemberRepo memberRepo) {
        this.memberRepo = memberRepo;
    }

    public Member addMember(Member member){
        return memberRepo.save(member);
    }

    public List<Member> findAllMember(){
        return memberRepo.findAll();
    }

    public Member updateMember(Member member){
        return memberRepo.save(member);
    }

    public Member findByUserId(String userid){
        System.out.println(userid);
        return memberRepo.findAllByUserid(userid)
                .orElseThrow(() -> new UserNotFoundException("User by id "+ userid + " was not found"));
    }

    public void deleteMember(String userid){
        memberRepo.deleteMemberByUserid(userid);
    }
}

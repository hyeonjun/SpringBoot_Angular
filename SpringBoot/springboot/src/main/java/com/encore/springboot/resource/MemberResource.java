package com.encore.springboot.resource;

import com.encore.springboot.model.Member;
import com.encore.springboot.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberResource {
    private final MemberService memberService;

    public MemberResource(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = memberService.findAllMember();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @GetMapping("/find/{userid}")
    public ResponseEntity<Member> getMemberById(@PathVariable("userid") String userid) {
        Member member = memberService.findByUserId(userid);
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<Member> joinMember(@RequestBody Member member){
        Member mem = memberService.addMember(member);
        return new ResponseEntity<>(mem, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Member> updateMember(@RequestBody Member member){
        Member mem = memberService.updateMember(member);
        return new ResponseEntity<>(mem, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userid}")
    public ResponseEntity<?> deleteMember(@PathVariable("userid") String userid){
        memberService.deleteMember(userid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

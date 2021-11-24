package com.encore.springboot.repo;

import com.encore.springboot.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface MemberRepo extends JpaRepository<Member, Long> {

    @Transactional
    void deleteMemberByUserid(String userid);

    Optional<Member> findAllByUserid(String userid);
}

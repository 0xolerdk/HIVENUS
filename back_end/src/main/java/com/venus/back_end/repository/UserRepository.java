package com.venus.back_end.repository;

import com.venus.back_end.entity.OurUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<OurUser, Long> {

    Optional<OurUser> findByEmail(String email);

}
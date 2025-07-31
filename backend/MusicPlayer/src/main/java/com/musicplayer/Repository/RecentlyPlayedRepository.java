package com.musicplayer.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.musicplayer.Model.RecentlyPlayed;

public interface RecentlyPlayedRepository extends JpaRepository<RecentlyPlayed, Long> {
    List<RecentlyPlayed> findByUserId(Long userId);
}

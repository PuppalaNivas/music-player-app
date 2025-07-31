package com.musicplayer.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.musicplayer.Model.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);

    // ✅ Add this method to find favorite by userId and songId
    Optional<Favorite> findByUserIdAndSongId(Long userId, Long songId);
}

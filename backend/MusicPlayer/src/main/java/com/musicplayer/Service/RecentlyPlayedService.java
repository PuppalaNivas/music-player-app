package com.musicplayer.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.musicplayer.Model.RecentlyPlayed;
import com.musicplayer.Repository.RecentlyPlayedRepository;

@Service
public class RecentlyPlayedService {

    private final RecentlyPlayedRepository recentlyPlayedRepository;

    public RecentlyPlayedService(RecentlyPlayedRepository recentlyPlayedRepository) {
        this.recentlyPlayedRepository = recentlyPlayedRepository;
    }

    public List<RecentlyPlayed> getRecentlyPlayedByUserId(Long userId) {
        return recentlyPlayedRepository.findByUserId(userId);
    }

    public RecentlyPlayed saveRecentlyPlayed(RecentlyPlayed recentlyPlayed) {
        return recentlyPlayedRepository.save(recentlyPlayed);
    }
}

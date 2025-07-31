package com.musicplayer.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.musicplayer.Model.RecentlyPlayed;
import com.musicplayer.Service.RecentlyPlayedService;

@RestController
@RequestMapping("/api/recently-played")
@CrossOrigin("*")
public class RecentlyPlayedController {

    private final RecentlyPlayedService recentlyPlayedService;

    public RecentlyPlayedController(RecentlyPlayedService recentlyPlayedService) {
        this.recentlyPlayedService = recentlyPlayedService;
    }

    @GetMapping("/user/{userId}")
    public List<RecentlyPlayed> getRecentlyPlayedByUserId(@PathVariable Long userId) {
        return recentlyPlayedService.getRecentlyPlayedByUserId(userId);
    }

    @PostMapping
    public RecentlyPlayed addRecentlyPlayed(@RequestBody RecentlyPlayed recentlyPlayed) {
        return recentlyPlayedService.saveRecentlyPlayed(recentlyPlayed);
    }
}

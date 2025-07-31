package com.musicplayer.Model;

public class FavoriteRequest {
    private Long userId;
    private Long songId;

    public FavoriteRequest() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
    }
}
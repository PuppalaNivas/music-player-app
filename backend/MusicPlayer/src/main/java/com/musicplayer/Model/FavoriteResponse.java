package com.musicplayer.Model;

public class FavoriteResponse {
    private Long songId;
    private String songName;
    private String artist;
    private String image;
    private String movieName;
    private String url;  

    public FavoriteResponse(Long songId, String songName, String artist, String image , String movieName, String url) {
        this.songId = songId;
        this.songName = songName;
        this.artist = artist;
        this.image = image;
        this.movieName = movieName;
        this.url = url;
        
    }

    // Getters
    public Long getSongId() { return songId; }
    public String getSongName() { return songName; }
    public String getArtist() { return artist; }
    public String getImage() { return image; }
    public String getmovieName() { return movieName; }
    public String geturl() { return url; }
    
}
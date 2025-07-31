package com.musicplayer.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "songs")

public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String songName;
    private String artist;
    private String movieName;
    private String genre;
    private String language;
    
    @Column(length = 1000)
    private String url;

    @Column(length = 1000)
    private String image;

    private int releaseYear;
    
    @Column(length = 1000)
    private String ArtistImage;
    
    private boolean isTrending;
    private boolean isNewRelease;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSongName() {
		return songName;
	}
	public void setSongName(String songName) {
		this.songName = songName;
	}
	public String getArtist() {
		return artist;
	}
	public void setArtist(String artist) {
		this.artist = artist;
	}
	public String getMovieName() {
		return movieName;
	}
	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getReleaseYear() {
		return releaseYear;
	}
	public void setReleaseYear(int releaseYear) {
		this.releaseYear = releaseYear;
	}
	public boolean isTrending() {
		return isTrending;
	}
	public void setTrending(boolean isTrending) {
		this.isTrending = isTrending;
	}
	public boolean isNewRelease() {
		return isNewRelease;
	}
	public void setNewRelease(boolean isNewRelease) {
		this.isNewRelease = isNewRelease;
	}
	public Song(Long id, String songName, String artist, String movieName, String genre, String language, String url,
			String image,String ArtistImage, int releaseYear, boolean isTrending, boolean isNewRelease) {
		super();
		this.id = id;
		this.songName = songName;
		this.artist = artist;
		this.movieName = movieName;
		this.genre = genre;
		this.language = language;
		this.url = url;
		this.image = image;
		this.releaseYear = releaseYear;
		this.isTrending = isTrending;
		this.isNewRelease = isNewRelease;
		this.ArtistImage = ArtistImage;
	}
	public Song() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Song [id=" + id + ", songName=" + songName + ", artist=" + artist + ", movieName=" + movieName
				+ ", genre=" + genre + ", language=" + language + ", url=" + url + ", image=" + image + ", releaseYear="
				+ releaseYear + ", ArtistImage=" + ArtistImage + ", isTrending=" + isTrending + ", isNewRelease="
				+ isNewRelease + "]";
	}
	public String getArtistImage() {
		return ArtistImage;
	}
	public void setArtistImage(String artistImage) {
		ArtistImage = artistImage;
	}
	
}

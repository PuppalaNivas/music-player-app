package com.musicplayer.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.musicplayer.Model.Song;
import com.musicplayer.Repository.SongRepository;

@Service
public class SongService {

    private final SongRepository songRepository;

    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public List<Song> getTrendingSongs() {
        return songRepository.findByIsTrendingTrue();
    }

    public List<Song> getNewReleases() {
        return songRepository.findByIsNewReleaseTrue();
    }

    public List<Song> getSongsByArtist(String artist) {
        return songRepository.findByArtistIgnoreCase(artist);
    }

    public List<Song> getSongsByLanguage(String language) {
        return songRepository.findByLanguageIgnoreCase(language);
    }

    public List<Song> getSongsByGenre(String genre) {
        return songRepository.findByGenreIgnoreCase(genre);
    }

    public List<Song> searchSongs(String keyword) {
        return songRepository.findBySongNameContainingIgnoreCaseOrArtistContainingIgnoreCaseOrMovieNameContainingIgnoreCase(
                keyword, keyword, keyword);
    }

    public Song saveSong(Song song) {
        return songRepository.save(song);
    }
}

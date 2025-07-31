package com.musicplayer.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.musicplayer.Model.Song;
import com.musicplayer.Service.SongService;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin("*")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

    @GetMapping("/trending")
    public List<Song> getTrendingSongs() {
        return songService.getTrendingSongs();
    }

    @GetMapping("/new")
    public List<Song> getNewReleases() {
        return songService.getNewReleases();
    }

    @GetMapping("/artist/{artist}")
    public List<Song> getSongsByArtist(@PathVariable String artist) {
        return songService.getSongsByArtist(artist);
    }

    @GetMapping("/language/{language}")
    public List<Song> getSongsByLanguage(@PathVariable String language) {
        return songService.getSongsByLanguage(language);
    }

    @GetMapping("/genre/{genre}")
    public List<Song> getSongsByGenre(@PathVariable String genre) {
        return songService.getSongsByGenre(genre);
    }

    @GetMapping("/search")
    public List<Song> searchSongs(@RequestParam String keyword) {
        return songService.searchSongs(keyword);
    }

    @PostMapping
    public Song saveSong(@RequestBody Song song) {
        return songService.saveSong(song);
    }
}

package com.musicplayer.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.musicplayer.Model.Artist;
import com.musicplayer.Service.ArtistService;

@RestController
@RequestMapping("/api/artists")
@CrossOrigin("*")
public class ArtistController {

    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    
    @GetMapping
    public List<Artist> getAllArtists() {
        return artistService.getAllArtists();
    }
    @GetMapping("/{name}")
    public Artist getArtistByName(@PathVariable String name) {
        return artistService.getArtistByName(name);
    }

    @PostMapping
    public Artist saveArtist(@RequestBody Artist artist) {
        return artistService.saveArtist(artist);
    }
}

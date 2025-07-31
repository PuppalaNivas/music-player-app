package com.musicplayer.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.musicplayer.Model.Artist;
import com.musicplayer.Repository.ArtistRepository;

@Service
public class ArtistService {

    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public Artist getArtistByName(String name) {
        return artistRepository.findByNameIgnoreCase(name);
    }

    public Artist saveArtist(Artist artist) {
        return artistRepository.save(artist);
    }
    
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }
}

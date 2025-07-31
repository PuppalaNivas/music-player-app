package com.musicplayer.Repository;



import com.musicplayer.Model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Artist findByNameIgnoreCase(String name);
}

package com.musicplayer.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.musicplayer.Model.Song;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByIsTrendingTrue();
    List<Song> findByIsNewReleaseTrue();
    List<Song> findByArtistIgnoreCase(String artist);
    List<Song> findByLanguageIgnoreCase(String language);
    List<Song> findByGenreIgnoreCase(String genre);
    List<Song> findBySongNameContainingIgnoreCaseOrArtistContainingIgnoreCaseOrMovieNameContainingIgnoreCase(String songName, String artist, String movie);
}

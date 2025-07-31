package com.musicplayer.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import com.musicplayer.Model.Favorite;
import com.musicplayer.Model.FavoriteRequest;
import com.musicplayer.Model.FavoriteResponse;
import com.musicplayer.Model.Song;
import com.musicplayer.Model.User;
import com.musicplayer.Repository.SongRepository;
import com.musicplayer.Repository.UserRepository;
import com.musicplayer.Service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin("*")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final UserRepository userRepository;
    private final SongRepository songRepository;

    public FavoriteController(FavoriteService favoriteService,
                              UserRepository userRepository,
                              SongRepository songRepository) {
        this.favoriteService = favoriteService;
        this.userRepository = userRepository;
        this.songRepository = songRepository;
    }

    // ✅ Get all favorites for a specific user (DTO)
    @GetMapping("/user/{userId}")
    public List<FavoriteResponse> getFavoritesByUserId(@PathVariable Long userId) {
        List<Favorite> favorites = favoriteService.getFavoritesByUserId(userId);

        return favorites.stream()
            .map(fav -> new FavoriteResponse(
                fav.getSong().getId(),
                fav.getSong().getSongName(),
                fav.getSong().getArtist().toString(),
                fav.getSong().getImage(),
                fav.getSong().getMovieName(),
                fav.getSong().getUrl()     
            ))
            .collect(Collectors.toList());
    }

    // ✅ Get all favorites (admin/debug)
    @GetMapping
    public List<Favorite> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

    // ✅ Add a new favorite
    @PostMapping
    public Favorite addFavorite(@RequestBody FavoriteRequest request) {
        User user = userRepository.findById(request.getUserId())
                      .orElseThrow(() -> new RuntimeException("User not found"));

        Song song = songRepository.findById(request.getSongId())
                      .orElseThrow(() -> new RuntimeException("Song not found"));

        Favorite favorite = new Favorite(user, song);
        return favoriteService.saveFavorite(favorite);
    }

    // ✅ Remove favorite by ID
    @DeleteMapping("/{id}")
    public void deleteFavorite(@PathVariable Long id) {
        favoriteService.deleteFavoriteById(id);
    }

    // ✅ Remove favorite by userId and songId (used from frontend)
    @DeleteMapping("/user/{userId}/song/{songId}")
    public void deleteFavoriteByUserAndSong(@PathVariable Long userId, @PathVariable Long songId) {
        favoriteService.deleteFavoriteByUserIdAndSongId(userId, songId);
    }
}

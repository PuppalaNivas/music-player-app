package com.musicplayer.Service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.musicplayer.Model.Favorite;
import com.musicplayer.Repository.FavoriteRepository;


@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public List<Favorite> getFavoritesByUserId(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }

    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public void deleteFavoriteById(Long id) {
        if (!favoriteRepository.existsById(id)) {
            throw new RuntimeException("Favorite not found");
        }
        favoriteRepository.deleteById(id);
    }

    // ✅ NEW
    public void deleteFavoriteByUserIdAndSongId(Long userId, Long songId) {
        Favorite favorite = favoriteRepository.findByUserIdAndSongId(userId, songId)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));
        favoriteRepository.delete(favorite);
    }
}
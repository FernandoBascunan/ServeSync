package servesync.Mesas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import servesync.Mesas.entity.Mesa;

import java.util.List;

public interface MesaRepository extends JpaRepository<Mesa, Integer> {
    List<Mesa> findAllByZonaId(int zonaId);
}

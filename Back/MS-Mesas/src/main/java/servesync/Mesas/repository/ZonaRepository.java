package servesync.Mesas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import servesync.Mesas.entity.Zona;

import java.util.List;

public interface ZonaRepository extends JpaRepository<Zona, Integer> {
    List<Zona> findAllByEmpresaId(Long empresaId);
}

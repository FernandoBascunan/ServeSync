package servesync.Inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import servesync.Inventario.entity.Producto;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findAllByEmpresaID(Long empresaID);
}

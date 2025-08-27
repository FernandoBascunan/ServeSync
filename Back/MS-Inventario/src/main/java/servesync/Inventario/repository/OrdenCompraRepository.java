package servesync.Inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import servesync.Inventario.entity.OrdenCompra;

import java.util.List;

public interface OrdenCompraRepository extends JpaRepository<OrdenCompra, Long> {
    List<OrdenCompra> findByEmpresaID(long empresaID);
}

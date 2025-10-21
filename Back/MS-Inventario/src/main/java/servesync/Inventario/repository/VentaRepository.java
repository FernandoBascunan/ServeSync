package servesync.Inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import servesync.Inventario.entity.Venta;

import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {
    List<Venta> findByEmpresaID(Long empresaID);
    List<Venta> findDistinctByEmpresaIDAndDetalles_Producto_Id(Long empresaID, Long productoID);
}

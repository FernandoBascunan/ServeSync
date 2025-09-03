package servesync.Inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import servesync.Inventario.config.TenantContext;
import servesync.Inventario.dto.DetalleOrdenDTO;
import servesync.Inventario.dto.OrdenCompraDTO;
import servesync.Inventario.dto.OrdenResponseDTO;
import servesync.Inventario.entity.DetalleOrden;
import servesync.Inventario.entity.OrdenCompra;
import servesync.Inventario.entity.Producto;
import servesync.Inventario.repository.OrdenCompraRepository;
import servesync.Inventario.repository.ProductoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdenCompraService {
    @Autowired
    private OrdenCompraRepository ordenCompraRepository;
    @Autowired
    private OrdenMapper ordenMapper;
    @Autowired
    private ProductoRepository productoRepository;

    public OrdenResponseDTO ingresar(OrdenCompraDTO orden) {
        Long empresaId = TenantContext.getCurrentTenant();
        OrdenCompra ordenCompra = new OrdenCompra();
        ordenCompra.setFechaIngreso(LocalDate.from(LocalDateTime.now()));
        ordenCompra.setEmpresaID(empresaId);
        ordenCompra.setProveedor(orden.getProveedor());

        for(DetalleOrdenDTO detalleDTO: orden.getDetalles()){
            Producto producto = productoRepository.findById(detalleDTO.getProductoId()).orElseThrow(() -> new RuntimeException("No existe el producto"));
            DetalleOrden detalleOrden = new DetalleOrden();
            detalleOrden.setProducto(producto);
            detalleOrden.setCantidad(detalleDTO.getCantidad());
            detalleOrden.setPrecioUnitario(detalleDTO.getPrecioUnitario());
            detalleOrden.setOrdenCompra(ordenCompra);
            ordenCompra.getDetalles().add(detalleOrden);

            producto.setStockActual(producto.getStockActual() + detalleDTO.getCantidad());
            productoRepository.save(producto);
        }
        OrdenCompra guardada = ordenCompraRepository.save(ordenCompra);
        return ordenMapper.toDTO(guardada);
    }
    public List<OrdenResponseDTO> Ordenes(){
        Long empresaId = TenantContext.getCurrentTenant();
        return ordenCompraRepository.findByEmpresaID(empresaId)
                .stream()
                .map(ordenMapper::toDTO)
                .collect(Collectors.toList());
    }

}

package servesync.Inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import servesync.Inventario.config.TenantContext;
import servesync.Inventario.entity.Venta;
import servesync.Inventario.repository.VentaRepository;

import java.util.List;

@Service
public class VentaService {
    @Autowired
    private VentaRepository ventaRepository;
    public List<Venta> listar(Long empresaId) {
        //Long empresaId = TenantContext.getCurrentTenant();
        return ventaRepository.findByEmpresaID(empresaId);
    }
    public Venta registrarVenta(Venta venta) {
        return ventaRepository.save(venta);
    }

}

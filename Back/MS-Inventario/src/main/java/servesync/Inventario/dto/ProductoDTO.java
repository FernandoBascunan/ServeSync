package servesync.Inventario.dto;

public class ProductoDTO {
    private Long id;
    private String nombre;
    private Integer stockActual;
    private Double precio;
    private String categoria;
    private Long empresaID;

    public ProductoDTO() {}


    public ProductoDTO(Long id, String nombre, Integer stockActual, Double precio, String categoria, Long empresaID) {
        this.id = id;
        this.nombre = nombre;
        this.stockActual = stockActual;
        this.precio = precio;
        this.categoria = categoria;
        this.empresaID = empresaID;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Integer getStockActual() { return stockActual; }
    public void setStockActual(Integer stockActual) { this.stockActual = stockActual; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public Long getEmpresaID() { return empresaID; }
    public void setEmpresaID(Long empresaID) { this.empresaID = empresaID; }
}
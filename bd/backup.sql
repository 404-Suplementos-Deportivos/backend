--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2023-06-08 08:35:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 248 (class 1259 OID 33687)
-- Name: banners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banners (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    descripcion character varying(120) NOT NULL,
    url_imagen character varying NOT NULL
);


ALTER TABLE public.banners OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 33686)
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banners_id_seq OWNER TO postgres;

--
-- TOC entry 3600 (class 0 OID 0)
-- Dependencies: 247
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;


--
-- TOC entry 254 (class 1259 OID 49521)
-- Name: carrito; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrito (
    id integer NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    productos jsonb
);


ALTER TABLE public.carrito OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 49520)
-- Name: carrito_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carrito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carrito_id_seq OWNER TO postgres;

--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 253
-- Name: carrito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carrito_id_seq OWNED BY public.carrito.id;


--
-- TOC entry 214 (class 1259 OID 33335)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    descripcion character varying(200),
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 33334)
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categorias_id_seq OWNER TO postgres;

--
-- TOC entry 3602 (class 0 OID 0)
-- Dependencies: 213
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- TOC entry 242 (class 1259 OID 33626)
-- Name: cupones_descuento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cupones_descuento (
    id integer NOT NULL,
    codigo character varying(15) NOT NULL,
    fecha_vencimiento date NOT NULL,
    descuento numeric NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.cupones_descuento OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 33625)
-- Name: cupones_descuento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cupones_descuento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cupones_descuento_id_seq OWNER TO postgres;

--
-- TOC entry 3603 (class 0 OID 0)
-- Dependencies: 241
-- Name: cupones_descuento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cupones_descuento_id_seq OWNED BY public.cupones_descuento.id;


--
-- TOC entry 236 (class 1259 OID 33558)
-- Name: detalles_facturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalles_facturas (
    id integer NOT NULL,
    cantidad integer NOT NULL,
    precio money NOT NULL,
    descuento integer NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL,
    id_factura integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.detalles_facturas OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 33557)
-- Name: detalles_facturas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalles_facturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalles_facturas_id_seq OWNER TO postgres;

--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 235
-- Name: detalles_facturas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalles_facturas_id_seq OWNED BY public.detalles_facturas.id;


--
-- TOC entry 230 (class 1259 OID 33490)
-- Name: detalles_np; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalles_np (
    id integer NOT NULL,
    cantidad_pedida integer NOT NULL,
    cantidad_recibida integer NOT NULL,
    precio money NOT NULL,
    descuento integer NOT NULL,
    estado boolean NOT NULL,
    id_nota_pedido integer DEFAULT 0 NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.detalles_np OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33489)
-- Name: detalles_np_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalles_np_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalles_np_id_seq OWNER TO postgres;

--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 229
-- Name: detalles_np_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalles_np_id_seq OWNED BY public.detalles_np.id;


--
-- TOC entry 244 (class 1259 OID 33635)
-- Name: detalles_pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalles_pedidos (
    id integer NOT NULL,
    cantidad integer NOT NULL,
    precio money NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL,
    id_pedido integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.detalles_pedidos OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 33634)
-- Name: detalles_pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalles_pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalles_pedidos_id_seq OWNER TO postgres;

--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 243
-- Name: detalles_pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalles_pedidos_id_seq OWNED BY public.detalles_pedidos.id;


--
-- TOC entry 234 (class 1259 OID 33528)
-- Name: estados_factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados_factura (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.estados_factura OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 33527)
-- Name: estados_factura_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estados_factura_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estados_factura_id_seq OWNER TO postgres;

--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 233
-- Name: estados_factura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estados_factura_id_seq OWNED BY public.estados_factura.id;


--
-- TOC entry 226 (class 1259 OID 33431)
-- Name: estados_np; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados_np (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.estados_np OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33430)
-- Name: estados_np_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estados_np_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estados_np_id_seq OWNER TO postgres;

--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 225
-- Name: estados_np_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estados_np_id_seq OWNED BY public.estados_np.id;


--
-- TOC entry 238 (class 1259 OID 33587)
-- Name: estados_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados_pedido (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.estados_pedido OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 33586)
-- Name: estados_pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estados_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estados_pedido_id_seq OWNER TO postgres;

--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 237
-- Name: estados_pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estados_pedido_id_seq OWNED BY public.estados_pedido.id;


--
-- TOC entry 232 (class 1259 OID 33520)
-- Name: facturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facturas (
    id integer NOT NULL,
    fecha date NOT NULL,
    fecha_vencimiento date NOT NULL,
    numero_factura bigint DEFAULT 0 NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_estado integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.facturas OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33518)
-- Name: facturas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facturas_id_seq OWNER TO postgres;

--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 231
-- Name: facturas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facturas_id_seq OWNED BY public.facturas.id;


--
-- TOC entry 246 (class 1259 OID 33665)
-- Name: ganancias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ganancias (
    id integer NOT NULL,
    vigencia date NOT NULL,
    porcentaje numeric(5,2) DEFAULT 0 NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.ganancias OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 33664)
-- Name: ganancias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ganancias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ganancias_id_seq OWNER TO postgres;

--
-- TOC entry 3611 (class 0 OID 0)
-- Dependencies: 245
-- Name: ganancias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ganancias_id_seq OWNED BY public.ganancias.id;


--
-- TOC entry 228 (class 1259 OID 33438)
-- Name: notas_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notas_pedido (
    id integer NOT NULL,
    fecha date NOT NULL,
    version integer NOT NULL,
    fecha_vencimiento date NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_proveedor integer DEFAULT 0 NOT NULL,
    id_estado_np integer DEFAULT 0 NOT NULL,
    id_tipo_compra integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.notas_pedido OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33437)
-- Name: notas_pedido_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notas_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notas_pedido_id_seq OWNER TO postgres;

--
-- TOC entry 3612 (class 0 OID 0)
-- Dependencies: 227
-- Name: notas_pedido_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notas_pedido_id_seq OWNED BY public.notas_pedido.id;


--
-- TOC entry 240 (class 1259 OID 33596)
-- Name: pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos (
    id integer NOT NULL,
    fecha date NOT NULL,
    descuento integer NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_estado_pedido integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.pedidos OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 33595)
-- Name: pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedidos_id_seq OWNER TO postgres;

--
-- TOC entry 3613 (class 0 OID 0)
-- Dependencies: 239
-- Name: pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


--
-- TOC entry 216 (class 1259 OID 33343)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(80) NOT NULL,
    descripcion character varying(600) NOT NULL,
    url_imagen character varying NOT NULL,
    precio_lista money NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    stock_minimo integer NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    id_categoria integer DEFAULT 0 NOT NULL,
    id_subcategoria integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 33342)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 3614 (class 0 OID 0)
-- Dependencies: 215
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 222 (class 1259 OID 33394)
-- Name: productos_proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos_proveedores (
    id integer NOT NULL,
    precio money NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL,
    id_proveedor integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.productos_proveedores OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33393)
-- Name: productos_proveedores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_proveedores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_proveedores_id_seq OWNER TO postgres;

--
-- TOC entry 3615 (class 0 OID 0)
-- Dependencies: 221
-- Name: productos_proveedores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_proveedores_id_seq OWNED BY public.productos_proveedores.id;


--
-- TOC entry 220 (class 1259 OID 33375)
-- Name: proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedores (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    telefono character varying(30) NOT NULL,
    direccion character varying(60) NOT NULL,
    codigo_postal integer NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    id_tipo_iva integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.proveedores OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33374)
-- Name: proveedores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proveedores_id_seq OWNER TO postgres;

--
-- TOC entry 3616 (class 0 OID 0)
-- Dependencies: 219
-- Name: proveedores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedores_id_seq OWNED BY public.proveedores.id;


--
-- TOC entry 210 (class 1259 OID 33303)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre character varying(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 33302)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 3617 (class 0 OID 0)
-- Dependencies: 209
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 252 (class 1259 OID 49461)
-- Name: subcategorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategorias (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    descripcion character varying(200),
    estado boolean DEFAULT true NOT NULL,
    id_categoria integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.subcategorias OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 49460)
-- Name: subcategorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategorias_id_seq OWNER TO postgres;

--
-- TOC entry 3618 (class 0 OID 0)
-- Dependencies: 251
-- Name: subcategorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subcategorias_id_seq OWNED BY public.subcategorias.id;


--
-- TOC entry 224 (class 1259 OID 33424)
-- Name: tipos_compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_compra (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.tipos_compra OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33423)
-- Name: tipos_compra_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_compra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipos_compra_id_seq OWNER TO postgres;

--
-- TOC entry 3619 (class 0 OID 0)
-- Dependencies: 223
-- Name: tipos_compra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_compra_id_seq OWNED BY public.tipos_compra.id;


--
-- TOC entry 218 (class 1259 OID 33368)
-- Name: tipos_iva; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_iva (
    id integer NOT NULL,
    nombre character varying(15) NOT NULL,
    descripcion character varying(80) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.tipos_iva OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 33367)
-- Name: tipos_iva_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_iva_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipos_iva_id_seq OWNER TO postgres;

--
-- TOC entry 3620 (class 0 OID 0)
-- Dependencies: 217
-- Name: tipos_iva_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_iva_id_seq OWNED BY public.tipos_iva.id;


--
-- TOC entry 250 (class 1259 OID 33696)
-- Name: tipos_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_pago (
    id integer NOT NULL,
    nombre character varying(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);


ALTER TABLE public.tipos_pago OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 33695)
-- Name: tipos_pago_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_pago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipos_pago_id_seq OWNER TO postgres;

--
-- TOC entry 3621 (class 0 OID 0)
-- Dependencies: 249
-- Name: tipos_pago_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_pago_id_seq OWNED BY public.tipos_pago.id;


--
-- TOC entry 212 (class 1259 OID 33311)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(80) NOT NULL,
    apellido character varying(80) NOT NULL,
    email character varying(80) NOT NULL,
    password character varying(120) NOT NULL,
    token_confirmacion character varying(120),
    cuenta_confirmada boolean DEFAULT false NOT NULL,
    direccion character varying(60) NOT NULL,
    codigo_postal integer NOT NULL,
    telefono character varying(30),
    fecha_nacimiento date,
    estado boolean DEFAULT true NOT NULL,
    id_rol integer DEFAULT 2 NOT NULL,
    fecha_creacion date NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 33310)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 211
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 3330 (class 2604 OID 33690)
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- TOC entry 3336 (class 2604 OID 49524)
-- Name: carrito id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito ALTER COLUMN id SET DEFAULT nextval('public.carrito_id_seq'::regclass);


--
-- TOC entry 3280 (class 2604 OID 33338)
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- TOC entry 3322 (class 2604 OID 33629)
-- Name: cupones_descuento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupones_descuento ALTER COLUMN id SET DEFAULT nextval('public.cupones_descuento_id_seq'::regclass);


--
-- TOC entry 3314 (class 2604 OID 33561)
-- Name: detalles_facturas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_facturas ALTER COLUMN id SET DEFAULT nextval('public.detalles_facturas_id_seq'::regclass);


--
-- TOC entry 3305 (class 2604 OID 33493)
-- Name: detalles_np id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_np ALTER COLUMN id SET DEFAULT nextval('public.detalles_np_id_seq'::regclass);


--
-- TOC entry 3324 (class 2604 OID 33638)
-- Name: detalles_pedidos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_pedidos ALTER COLUMN id SET DEFAULT nextval('public.detalles_pedidos_id_seq'::regclass);


--
-- TOC entry 3312 (class 2604 OID 33531)
-- Name: estados_factura id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_factura ALTER COLUMN id SET DEFAULT nextval('public.estados_factura_id_seq'::regclass);


--
-- TOC entry 3298 (class 2604 OID 33434)
-- Name: estados_np id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_np ALTER COLUMN id SET DEFAULT nextval('public.estados_np_id_seq'::regclass);


--
-- TOC entry 3317 (class 2604 OID 33590)
-- Name: estados_pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_pedido ALTER COLUMN id SET DEFAULT nextval('public.estados_pedido_id_seq'::regclass);


--
-- TOC entry 3308 (class 2604 OID 33523)
-- Name: facturas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas ALTER COLUMN id SET DEFAULT nextval('public.facturas_id_seq'::regclass);


--
-- TOC entry 3327 (class 2604 OID 33668)
-- Name: ganancias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ganancias ALTER COLUMN id SET DEFAULT nextval('public.ganancias_id_seq'::regclass);


--
-- TOC entry 3300 (class 2604 OID 33441)
-- Name: notas_pedido id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas_pedido ALTER COLUMN id SET DEFAULT nextval('public.notas_pedido_id_seq'::regclass);


--
-- TOC entry 3319 (class 2604 OID 33599)
-- Name: pedidos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


--
-- TOC entry 3282 (class 2604 OID 33346)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 3292 (class 2604 OID 33397)
-- Name: productos_proveedores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos_proveedores ALTER COLUMN id SET DEFAULT nextval('public.productos_proveedores_id_seq'::regclass);


--
-- TOC entry 3289 (class 2604 OID 33378)
-- Name: proveedores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores ALTER COLUMN id SET DEFAULT nextval('public.proveedores_id_seq'::regclass);


--
-- TOC entry 3274 (class 2604 OID 33306)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3333 (class 2604 OID 49464)
-- Name: subcategorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategorias ALTER COLUMN id SET DEFAULT nextval('public.subcategorias_id_seq'::regclass);


--
-- TOC entry 3296 (class 2604 OID 33427)
-- Name: tipos_compra id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_compra ALTER COLUMN id SET DEFAULT nextval('public.tipos_compra_id_seq'::regclass);


--
-- TOC entry 3287 (class 2604 OID 33371)
-- Name: tipos_iva id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_iva ALTER COLUMN id SET DEFAULT nextval('public.tipos_iva_id_seq'::regclass);


--
-- TOC entry 3331 (class 2604 OID 33699)
-- Name: tipos_pago id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_pago ALTER COLUMN id SET DEFAULT nextval('public.tipos_pago_id_seq'::regclass);


--
-- TOC entry 3276 (class 2604 OID 33314)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 3588 (class 0 OID 33687)
-- Dependencies: 248
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banners (id, nombre, descripcion, url_imagen) FROM stdin;
\.


--
-- TOC entry 3594 (class 0 OID 49521)
-- Dependencies: 254
-- Data for Name: carrito; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrito (id, id_usuario, productos) FROM stdin;
44	103	[{"cantidad": 2, "id_producto": 2}, {"cantidad": 4, "id_producto": 1}]
47	117	[]
45	114	[]
43	90	[{"cantidad": 2, "id_producto": 27}, {"cantidad": 2, "id_producto": 3}]
46	116	[]
\.


--
-- TOC entry 3554 (class 0 OID 33335)
-- Dependencies: 214
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id, nombre, descripcion, estado) FROM stdin;
4	Suplementos deportivos	Productos en forma de polvo, cápsulas o tabletas que ayudan a mejorar el rendimiento físico y la recuperación muscular.	t
5	Ropa deportiva	Prendas diseñadas para el ejercicio físico, como pantalones cortos, camisetas, sudaderas, leggings y calcetines deportivos.	t
6	Calzado deportivo	Calzado diseñado para diferentes deportes y actividades físicas, como correr, entrenamiento cruzado, baloncesto, fútbol, tenis y golf	t
7	Accesorios deportivos	Accesorios utilizados para actividades físicas, como pesas, mancuernas, bandas de resistencia, pelotas de ejercicio, guantes, protectores bucales y gafas de natación	t
8	Equipamiento para gimnasios	Equipos de entrenamiento de fuerza y cardio para gimnasios, como bancos de pesas, máquinas de cardio, jaulas de potencia y barras olímpicas	t
9	Equipamiento para entrenamiento en casa	Equipos de entrenamiento de fuerza y cardio para el hogar, como bandas de resistencia, pesas libres, bicicletas estáticas y cintas de correr	t
11	Tecnología deportiva	Dispositivos electrónicos y aplicaciones diseñadas para mejorar el rendimiento deportivo, como monitores de actividad, relojes deportivos, auriculares inalámbricos y aplicaciones de entrenamiento	t
\.


--
-- TOC entry 3582 (class 0 OID 33626)
-- Dependencies: 242
-- Data for Name: cupones_descuento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cupones_descuento (id, codigo, fecha_vencimiento, descuento, estado) FROM stdin;
\.


--
-- TOC entry 3576 (class 0 OID 33558)
-- Dependencies: 236
-- Data for Name: detalles_facturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalles_facturas (id, cantidad, precio, descuento, id_producto, id_factura) FROM stdin;
145	1	$ 9.075,00	0	2	118
146	1	$ 10.587,50	0	5	118
147	1	$ 9.075,00	0	2	119
148	1	$ 10.587,50	0	5	119
149	1	$ 14.520,00	0	3	119
150	1	$ 14.520,00	0	27	120
151	1	$ 10.587,50	0	5	121
152	1	$ 9.075,00	0	2	122
153	1	$ 7.623,00	0	1	123
154	1	$ 9.075,00	0	2	124
155	1	$ 7.623,00	0	1	125
156	2	$ 1.052,70	0	31	126
157	2	$ 1.052,70	0	31	127
158	1	$ 10.587,50	0	5	128
159	3	$ 1.052,70	0	31	129
160	1	$ 10.587,50	0	5	130
164	1	$ 14.520,00	0	3	132
165	1	$ 8.748,30	0	23	132
166	1	$ 2.783,00	0	28	132
167	1	$ 7.623,00	0	1	133
168	1	$ 16.335,00	0	6	134
169	3	$ 9.075,00	0	2	134
170	1	$ 16.335,00	0	6	135
171	3	$ 9.075,00	0	2	135
172	3	$ 2.783,00	0	28	136
173	1	$ 14.520,00	0	3	136
174	1	$ 14.520,00	0	3	137
175	1	$ 7.623,00	0	1	138
176	3	$ 7.623,00	0	1	140
177	2	$ 1.052,70	0	31	140
178	1	$ 2.783,00	0	28	141
179	2	$ 9.075,00	0	2	141
180	3	$ 14.520,00	0	3	142
181	2	$ 21.780,00	0	7	142
182	2	$ 14.520,00	0	46	143
183	1	$ 20.570,00	0	54	143
184	1	$ 7.381,00	0	50	143
185	1	$ 56.870,00	0	60	143
186	2	$ 16.335,00	0	65	144
187	1	$ 25.410,00	0	66	144
188	1	$ 7.865,00	0	62	144
189	1	$ 10.527,00	0	63	144
190	1	$ 54.450,00	0	61	145
191	1	$ 96.800,00	0	58	145
192	1	$ 3.872,00	0	55	145
193	1	$ 10.527,00	0	53	145
194	2	$ 6.413,00	0	64	146
195	3	$ 20.570,00	0	54	146
196	3	$ 10.527,00	0	63	146
197	1	$ 7.623,00	0	1	147
198	3	$ 14.520,00	0	3	147
\.


--
-- TOC entry 3570 (class 0 OID 33490)
-- Dependencies: 230
-- Data for Name: detalles_np; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalles_np (id, cantidad_pedida, cantidad_recibida, precio, descuento, estado, id_nota_pedido, id_producto) FROM stdin;
4	5	5	$ 12.000,00	0	t	1	1
5	10	10	$ 21.000,00	0	t	1	3
6	4	4	$ 25.000,00	0	t	2	1
7	7	7	$ 15.000,00	0	t	2	2
25	4	4	$ 25.000,00	0	t	4	1
26	7	7	$ 15.000,00	0	t	4	2
31	5	0	$ 6.300,00	0	t	8	1
32	11	0	$ 12.000,00	0	t	8	3
39	2	0	$ 6.300,00	0	t	9	1
40	1	0	$ 6.300,00	0	t	10	1
41	1	0	$ 7.500,00	0	t	10	2
42	1	0	$ 12.000,00	0	t	10	3
46	1	0	$ 6.300,00	0	t	11	1
47	1	0	$ 7.500,00	0	t	11	2
48	1	0	$ 12.000,00	0	t	11	3
68	1	0	$ 6.300,00	0	t	12	1
69	3	0	$ 7.500,00	0	t	12	2
70	1	0	$ 12.000,00	0	t	12	3
29	2	2	$ 6.300,00	0	t	6	1
30	1	1	$ 6.300,00	0	t	7	1
28	1	1	$ 12.000,00	0	t	5	3
27	3	3	$ 6.300,00	0	t	5	1
71	2	2	$ 6.300,00	0	t	13	1
72	3	3	$ 7.500,00	0	t	13	2
73	2	2	$ 12.000,00	0	t	13	3
74	1	1	$ 6.300,00	0	t	14	1
75	2	2	$ 12.000,00	0	t	14	3
86	1	1	$ 7.500,00	0	t	17	2
76	2	2	$ 6.300,00	0	t	15	1
77	2	2	$ 6.300,00	0	t	16	1
78	1	1	$ 12.000,00	0	t	16	3
84	3	3	$ 6.300,00	0	t	17	1
85	2	2	$ 12.000,00	0	t	17	3
\.


--
-- TOC entry 3584 (class 0 OID 33635)
-- Dependencies: 244
-- Data for Name: detalles_pedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalles_pedidos (id, cantidad, precio, id_producto, id_pedido) FROM stdin;
\.


--
-- TOC entry 3574 (class 0 OID 33528)
-- Dependencies: 234
-- Data for Name: estados_factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados_factura (id, nombre, estado) FROM stdin;
1	PAGADA	t
2	VENCIDA	t
3	ANULADA	t
4	REVISION	t
\.


--
-- TOC entry 3566 (class 0 OID 33431)
-- Dependencies: 226
-- Data for Name: estados_np; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados_np (id, nombre, estado) FROM stdin;
1	PEND_ACEPTACION	t
2	PEND_ENTREGA	t
3	CERRADA	t
4	RECHAZADA	t
\.


--
-- TOC entry 3578 (class 0 OID 33587)
-- Dependencies: 238
-- Data for Name: estados_pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados_pedido (id, nombre, estado) FROM stdin;
1	PENDIENTE	t
2	ENTREGADO	t
3	CANCELADO	t
\.


--
-- TOC entry 3572 (class 0 OID 33520)
-- Dependencies: 232
-- Data for Name: facturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facturas (id, fecha, fecha_vencimiento, numero_factura, id_usuario, id_estado) FROM stdin;
118	2023-11-15	2023-11-17	1312954334	103	1
120	2023-05-16	2023-05-23	1312954154	103	1
121	2023-05-16	2023-05-23	1312955978	103	1
124	2023-05-16	2023-05-23	1312954446	103	1
126	2023-05-16	2023-05-23	0	103	4
127	2023-05-16	2023-05-23	1312956286	103	1
128	2023-05-16	2023-05-23	0	103	4
129	2023-05-16	2023-05-23	1312954866	103	1
130	2023-05-16	2023-05-23	1312954874	103	1
132	2023-05-16	2023-05-23	1314928555	114	1
139	2023-05-17	2023-05-24	0	116	4
140	2023-05-17	2023-05-24	1312978054	117	1
134	2023-05-17	2023-05-24	0	116	3
125	2023-05-16	2023-05-23	0	103	1
136	2023-04-17	2023-04-24	1314956471	116	1
141	2023-05-29	2023-06-05	1315318499	117	1
142	2023-05-29	2023-06-05	1315328681	117	1
143	2023-05-30	2023-06-06	1315359795	117	1
144	2023-05-30	2023-06-06	1313183130	117	1
133	2023-10-10	2023-10-13	1314928627	114	1
135	2023-09-19	2023-09-21	1314956359	116	1
137	2023-04-04	2023-04-07	1314956527	116	1
138	2023-04-04	2023-04-07	1314958585	116	1
145	2023-04-04	2023-04-07	1313183190	117	1
146	2023-03-25	2023-03-26	1315359949	117	1
122	2023-11-03	2023-11-07	1312954356	103	1
123	2023-11-12	2023-11-14	1312954396	103	1
119	2023-11-03	2023-11-06	1314919663	103	1
147	2023-05-31	2023-06-07	1315426583	117	1
\.


--
-- TOC entry 3586 (class 0 OID 33665)
-- Dependencies: 246
-- Data for Name: ganancias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ganancias (id, vigencia, porcentaje, id_usuario) FROM stdin;
6	2023-04-24	11.30	90
11	2023-05-11	21.00	90
12	2023-05-03	11.30	90
\.


--
-- TOC entry 3568 (class 0 OID 33438)
-- Dependencies: 228
-- Data for Name: notas_pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notas_pedido (id, fecha, version, fecha_vencimiento, id_usuario, id_proveedor, id_estado_np, id_tipo_compra) FROM stdin;
4	2023-05-09	1	2023-07-17	103	1	3	1
2	2023-05-09	1	2023-07-12	103	1	3	1
11	2023-05-11	1	2023-06-06	103	1	3	2
8	2023-05-11	1	2023-05-19	103	1	3	2
1	2023-05-08	1	2023-05-11	103	1	3	1
9	2023-04-11	1	2023-05-29	103	1	3	1
10	2023-04-11	1	2023-05-21	103	1	3	2
12	2023-03-11	2	2023-08-31	103	1	3	1
6	2023-05-10	1	2023-05-12	103	1	3	2
7	2023-05-10	1	2023-05-19	103	1	3	2
5	2023-03-10	1	2023-05-18	103	1	3	1
13	2023-05-29	1	2023-05-30	103	1	3	1
14	2023-05-29	1	2023-05-30	103	1	3	1
15	2023-05-29	1	2023-05-31	103	1	3	2
16	2023-05-29	1	2023-05-30	103	1	3	2
17	2023-05-29	3	2023-05-31	103	1	3	1
\.


--
-- TOC entry 3580 (class 0 OID 33596)
-- Dependencies: 240
-- Data for Name: pedidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedidos (id, fecha, descuento, id_usuario, id_estado_pedido) FROM stdin;
\.


--
-- TOC entry 3556 (class 0 OID 33343)
-- Dependencies: 216
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, descripcion, url_imagen, precio_lista, stock, stock_minimo, estado, id_categoria, id_subcategoria) FROM stdin;
4	Protein Caramel Latte 400 g	No hay nada como una buena dosis de proteínas y cafeína para ponerse en marcha, sean cuales sean los planes que tengas para el día. Tanto si te estás preparando para entrenar como si simplemente buscas algo saciante y suave después de levantarte temprano o de una comida rápida, la bebida instantánea de café-proteína con auténtico café 100% robusta de Prozis da en el clavo. O más bien dos puntos, ya que proporciona los beneficios de la cafeína y de la proteína de suero. Dos ventajas en un solo trago.	https://static.sscontent.com/thumb/1500/1500/products/124/v1131908_prozis_protein-caramel-latte-400-g_newin.jpg	$ 7.300,00	50	5	t	4	4
5	Protein Caramel Latte - Extra Caffeine 400 g	No hay nada como una buena dosis de proteínas y cafeína para ponerse en marcha, sean cuales sean los planes que tengas para el día. Tanto si te estás preparando para entrenar como si simplemente buscas algo saciante y suave después de levantarte temprano o de una comida rápida, la bebida instantánea de café-proteína con auténtico café 100% robusta de Prozis da en el clavo. O más bien dos puntos, ya que proporciona los beneficios de la cafeína y de la proteína de suero. Dos ventajas en un solo trago.	https://static.sscontent.com/thumb/1500/1500/products/124/v1132016_prozis_protein-caramel-latte-extra-caffeine-400-g_newin.jpg	$ 8.750,00	25	5	t	4	4
2	100% Whey Premium Protein 900 g	Las proteínas contribuyen al crecimiento y mantenimiento de la masa muscular, que no sólo es importante por su atractivo estético, sino también, y sobre todo, para favorecer la salud y el bienestar general desde la juventud hasta la vejez.	https://static.sscontent.com/thumb/1500/1500/products/124/v1084525_prozis_100-whey-premium-protein-900-g_newin.jpg	$ 7.500,00	22	5	t	4	4
42	12 x Big Shot 60ml	¿Estás listo para el Big Shot? Con este potenciador pre-entrenamiento, su entrenamiento nunca volverá a ser el mismo. Benefíciate de las ventajas de la Vitamina B6 y la Vitamina B12 para superar incluso los mayores retos.	https://static.sscontent.com/thumb/1500/1500/products/124/v1233593_prozis_12-x-big-shot-60ml_fiery-raspberry_newin_flavor.jpg	$ 23.500,00	21	5	t	4	8
1	Xtreme Whey Protein 2000 g	La proteína de suero ultrafiltrada de Xtreme Whey es una gran fuente de aminoácidos de cadena ramificada (BCAA) naturales, así como de glutamina y precursores, y contribuye al crecimiento y mantenimiento de la masa muscular. Para facilitar al organismo el proceso de digestión de las proteínas, la fórmula se ha mejorado con el complejo patentado DigeZyme®, una mezcla de enzimas digestivas. Como toque final, Xtreme Whey contiene 12 vitaminas, incluidas las vitaminas C y D, que aportan una ventaja adicional.	https://static.sscontent.com/thumb/1500/1500/products/124/v1211607_prozis_xtreme-whey-protein-2000-g_chocolate_newin_flavor.jpg	$ 6.300,00	32	5	t	4	6
43	100% Premium Vegan Protein 900 g	La salud, el bienestar general, el cambio climático y el bienestar de los animales hacen que cada vez más personas lleven un estilo de vida basado en las plantas. Nos comprometemos a ayudarte a alcanzar tus objetivos de fitness, tanto si sigues una dieta vegana como si simplemente estás explorando diferentes opciones.	https://static.sscontent.com/thumb/1500/1500/products/124/v1200661_prozis_100-premium-vegan-protein-900-g_newin.jpg	$ 12.000,00	33	5	t	4	12
3	Protein Cappuccino 400 g	No hay nada como una buena dosis de proteínas y cafeína para ponerse en marcha, sean cuales sean los planes que tengas para el día. Tanto si te estás preparando para entrenar como si simplemente buscas algo saciante y suave después de levantarte temprano o de una comida rápida, la bebida instantánea de café-proteína con auténtico café 100% robusta de Prozis da en el clavo. O más bien dos puntos, ya que proporciona los beneficios de la cafeína y de la proteína de suero. Dos ventajas en un solo trago.	https://static.sscontent.com/thumb/1500/1500/products/124/v1131881_prozis_protein-cappuccino-400-g_newin.jpg	$ 12.000,00	38	5	t	4	4
28	BCAA Drink 375ml	Tus días ajetreados y activos funcionarán a las mil maravillas. Eso es seguro. Disfrute de esta bebida refrescante y espumosa llena de bondades para estar bien hidratado y potenciado todos los días. Con una gran proporción de BCAA, ¡también contiene cafeína, vitaminas del complejo B, magnesio y zinc para reforzar tus objetivos! ¿Y lo mejor? Saciará tu sed con burbujas frescas, ¡revigorizando tu espíritu! ¡Bébelo en un abrir y cerrar de ojos!	https://static.sscontent.com/thumb/1500/1500/products/124/v1066801_prozis_bcaa-drink-375ml_newin.jpg	$ 2.300,00	33	5	t	4	6
23	Protein Hazelnut Latte 400 g	No hay nada como una buena dosis de proteínas y cafeína para ponerse en marcha, sean cuales sean los planes que tengas para el día. Tanto si te estás preparando para entrenar como si simplemente buscas algo saciante y suave después de levantarte temprano o de una comida rápida, la bebida instantánea de café-proteína con auténtico café 100% robusta de Prozis da en el clavo. O más bien dos puntos, ya que proporciona los beneficios de la cafeína y de la proteína de suero. Dos ventajas en un solo trago.	https://static.sscontent.com/thumb/1500/1500/products/124/v1131938_prozis_protein-hazelnut-latte-400-g_newin.jpg	$ 7.230,00	12	5	t	4	4
6	Protein Cappuccino - Extra Caffeine 400 g	No hay nada como una buena dosis de proteínas y cafeína para ponerse en marcha, sean cuales sean los planes que tengas para el día. Tanto si te estás preparando para entrenar como si simplemente buscas algo saciante y suave después de levantarte temprano o de una comida rápida, la bebida instantánea de café-proteína con auténtico café 100% robusta de Prozis da en el clavo. O más bien dos puntos, ya que proporciona los beneficios de la cafeína y de la proteína de suero. Dos ventajas en un solo trago.	https://static.sscontent.com/thumb/1500/1500/products/124/v1131983_prozis_protein-cappuccino-extra-caffeine-400-g_newin.jpg	$ 13.500,00	30	5	t	4	4
31	Instant Omelet 350 g - Classic	Sí, ¡se puede hacer una tortilla sin romper huevos!\nComer una deliciosa tortilla rica en proteínas es una forma perfecta y equilibrada de empezar el día, y esta deliciosa y esponjosa maravilla sin complicaciones es justo lo que estabas buscando.\nHemos hecho todo el trabajo por usted: hemos escogido los mejores huevos, los hemos convertido en un increíble huevo entero en polvo y les hemos añadido ingredientes seleccionados + ¡sus sabores favoritos!	https://static.sscontent.com/thumb/1500/1500/products/124/v1211788_prozis_instant-omelet-350-g-classic_newin.jpg	$ 870,00	17	5	f	4	8
25	BCAA 8:1:1 300 g	Xcore ha desarrollado el producto BCAA más potente del mercado. Con una combinación de leucina, isoleucina y valina en una proporción especial de 8:1:1, es el suplemento perfecto para quienes se someten a sesiones de entrenamiento intensas y agotadoras.\nDurante los últimos años, los BCAA se han investigado a fondo. Los BCAA se encuentran en cantidades considerables en el músculo esquelético, constituyendo más del 15% de todas las proteínas musculares, y desempeñan un papel importante a la hora de mantener y desarrollar la masa muscular.	https://static.sscontent.com/thumb/1500/1500/products/124/v1130451_prozis_bcaa-811-300-g_newin.jpg	$ 12.000,00	16	5	t	4	6
7	100% Whey Prime 1000 g	Los procesos de producción de suplementos de proteína de suero prácticamente no han cambiado desde la década de 1980. Básicamente, el suero se obtiene de la leche mediante un proceso de filtración, que la industria no ha tocado mucho desde que se empezaron a producir suplementos de suero.	https://static.sscontent.com/thumb/1500/1500/products/124/v1118851_prozis_100-whey-prime-1000-g_natural_newin_flavor.jpg	$ 18.000,00	33	5	t	4	4
27	BCAA GlycoFusion 300 g	El reto está ahí, y te mereces una fórmula de alta calidad que te ayude en tu empeño por completarlo. Por eso Prozis ha desarrollado una maravilla especial con un gran efecto sinérgico, que contiene potentes ingredientes: BCAA, maltodextrina y ácido alfa-lipoico. Ahora tiene definitivamente lo que hace falta para entregarse por completo a los objetivos más elevados.	https://static.sscontent.com/thumb/1500/1500/products/124/v1198403_prozis_bcaa-glycofusion-300-g_newin.jpg	$ 12.000,00	10	5	t	4	6
24	100% Vegan Protein 900 g	Las personas necesitan cantidades significativas de proteínas a diario para garantizar el crecimiento normal y el mantenimiento de la masa muscular, que no sólo es importante por su atractivo estético, sino también, y sobre todo, para favorecer el bienestar general.\nAdemás, las proteínas desempeñan un papel crucial en el mantenimiento de unos huesos normales, que constituyen la base de un cuerpo fuerte y sano.	https://static.sscontent.com/thumb/1500/1500/products/124/v1137994_prozis_100-vegan-protein-900-g_unflavoured_newin_flavor.jpg	$ 12.000,00	43	5	t	4	12
26	BCAA 5000 125 tabs	Sabe que las proteínas son uno de los nutrientes más importantes, pero ¿ha pensado alguna vez en qué consisten? Efectivamente, de aminoácidos. Las proteínas del cuerpo humano se componen de un total de 20 aminoácidos, algunos de ellos más eficaces que otros para el desarrollo muscular. Nueve de ellos se consideran "esenciales", lo que significa que el organismo es incapaz de sintetizarlos. Y de estos 9 aminoácidos esenciales, tres se conocen como aminoácidos de cadena ramificada, o BCAA.	https://static.sscontent.com/thumb/1500/1500/products/124/v1098430_prozis_bcaa-5000-125-tabs_newin.jpg	$ 8.300,00	23	5	t	4	6
30	BCAA Drink 500 mL	Tus días ajetreados y activos funcionarán a las mil maravillas. Eso es seguro. Disfruta de esta refrescante bebida llena de bondades para estar bien hidratado y potenciado cada día. Con una gran proporción de BCAA, también contiene cafeína, vitaminas del complejo B, magnesio y zinc para reforzar tus objetivos. ¿Y lo mejor de todo? Saciará tu sed, ¡revigorizando tu espíritu! Bébelo en un abrir y cerrar de ojos: con su nueva fórmula y sabor mejorado, ¡no podría ser más fácil!	https://static.sscontent.com/thumb/1500/1500/products/124/v1203945_prozis_bcaa-drink-500-ml_newin.jpg	$ 2.400,00	43	3	t	4	6
29	Strength Training Pack	Las proteínas contribuyen al crecimiento y mantenimiento de la masa muscular, lo que no sólo es importante por su atractivo estético, sino también, y sobre todo, para favorecer la salud y el bienestar general desde la juventud hasta la vejez.\nAdemás, las proteínas desempeñan un papel crucial en el mantenimiento de unos huesos normales, que constituyen la base de un cuerpo fuerte y sano.	https://static.sscontent.com/thumb/1500/1500/products/124/v1105193_prozis_strength-training-pack_newin.jpg	$ 27.300,00	43	5	t	4	6
33	BCAA GlycoFusion 300 g	El reto está ahí, y te mereces una fórmula de alta calidad que te ayude en tu empeño por completarlo. Por eso hemos desarrollado una maravilla especial con un gran efecto sinérgico, que contiene potentes ingredientes: BCAA, maltodextrina y Ácido Ahora tiene definitivamente lo que hace falta para entregarse por completo a los objetivos más elevados.	https://static.sscontent.com/thumb/1500/1500/products/124/v1198403_prozis_bcaa-glycofusion-300-g_newin.jpg	$ 13.500,00	20	5	t	4	6
34	BCAA Prime 30 servings	Los procesos utilizados para producir suplementos proteicos prácticamente no han cambiado desde los años ochenta. Esto es cierto para el suero de leche, pero también para los suplementos de aminoácidos. Decididos a establecer un nuevo estándar de calidad para estas fórmulas, empezamos a hacer lo que mejor sabemos hacer: volver al punto de partida, replantearnos todo el proceso de producción e innovar.	https://static.sscontent.com/thumb/1500/1500/products/124/v1115740_prozis_bcaa-prime-30-servings_unflavoured_newin_flavor.jpg	$ 21.000,00	17	5	t	4	6
35	Recovery RTD 500 mL Wild Berry	Durante y después de tu entrenamiento o a lo largo del día, ¡querrás tomar una bebida refrescante rica en proteínas! Recovery Drink con BCAA, glutamina, zinc y magnesio es una opción más saludable en comparación con otros refrescos, ¡siempre lista para animarte y aportar nuevos sabores a tus ajetreados días!	https://static.sscontent.com/thumb/1500/1500/products/124/v1234763_prozis_recovery-rtd-500-ml-wild-berry_newin.jpg	$ 3.500,00	21	5	t	4	6
36	Recovery RTD 500 mL Orange	Durante y después de tu entrenamiento o a lo largo del día, ¡querrás tomar una bebida refrescante rica en proteínas! Recovery Drink con BCAA, glutamina, zinc y magnesio es una opción más saludable en comparación con otros refrescos, ¡siempre lista para animarte y aportar nuevos sabores a tus ajetreados días!	https://static.sscontent.com/thumb/1500/1500/products/124/v1234773_prozis_recovery-rtd-500-ml-orange_newin.jpg	$ 1.300,00	21	5	t	4	6
38	Big Shot - Pre-Workout 46	¿Estás listo para el gran golpe? Con este potenciador pre-entrenamiento tu entrenamiento nunca volverá a ser el mismo. Siente la adrenalina y consigue toda la concentración que necesitas para superar incluso el mayor desafío.	https://static.sscontent.com/thumb/1500/1500/products/124/v1141048_prozis_big-shot-pre-workout-46-servings_newin.jpg	$ 4.700,00	12	5	t	4	8
39	Energy Charge - Pre Workout 800 g	Tu Energy Charge lo tiene todo para elevar tus esfuerzos deportivos a un nuevo nivel de excelencia. Para los entrenamientos de resistencia y las competiciones que requieren mucho esfuerzo y energía, siempre puedes contar con un suplemento a la altura del reto al que te enfrentas. Con un complejo lleno de potentes ingredientes, que generan más fuerza, resistencia y ayudan a reducir la fatiga, también es una buena fuente de vitaminas y minerales para controlar tu equilibrio electrolítico, la clave de tu hidratación.	https://static.sscontent.com/thumb/1500/1500/products/124/v1076188_prozis_energy-charge-pre-workout-800-g_mojito_newin_flavor.jpg	$ 8.700,00	25	5	t	4	8
40	Vegan Pre-Workout 90 tabs	¿Quieres sacar el máximo partido a tus entrenamientos? Centra tus esfuerzos en lo que haces fuera del gimnasio. Una dieta equilibrada, con todos los nutrientes necesarios, una buena recuperación y ese empujón extra que sólo Vegan Pre-Workout puede ofrecer.	https://static.sscontent.com/thumb/1500/1500/products/124/v686651_prozis_vegan-pre-workout-90-tabs_newin.jpg	$ 9.500,00	12	5	t	4	8
37	BCAA 2:1:1 - 400 tabs	Todo el mundo sabe que siempre hay una táctica maravillosa para ofrecer el mejor de los espectáculos. Sólo hace falta un entrenamiento adecuado para ser uno de los privilegiados que alcanzan tan alto nivel. Fácil, ¿verdad? Descubra una fórmula especial con una gran proporción de aminoácidos de cadena ramificada y glutamina que le hará replantearse su forma de jugar y participar en sus entrenamientos hasta el final. 	https://static.sscontent.com/thumb/1500/1500/products/124/v1148044_prozis_bcaa-211-400-tabs_newin.jpg	$ 20.000,00	33	5	t	4	6
53	Running Shorts - Mustang Black	Están confeccionadas con un tejido suave y ligero que se mueve contigo. Presentan unas propiedades de elasticidad y transpirabilidad excepcionales, mientras que los paneles laterales se han refinado para ofrecer una libertad de movimiento sin restricciones.	https://static.sscontent.com/prodimg/products/124/v936558_prozis_-running-shorts-mustang-black_s_no-code_newin.jpg	$ 8.700,00	11	3	t	5	15
41	Amino Prime 20 servings	Seguimos subiendo el listón, esforzándonos por marcar realmente la diferencia en la industria de la nutrición deportiva y ayudarle a alcanzar sus objetivos. Tanto si se trata de abastecernos de materias primas como de procesarlas para elaborar productos de consumo, no hacemos concesiones. Siempre esforzándonos por superarnos a nosotros mismos, presentamos con orgullo Amino Prime, un potente y completo suplemento de aminoácidos disponible con y sin cafeína.	https://static.sscontent.com/thumb/1500/1500/products/124/v1115763_prozis_amino-prime-20-servings_newin.jpg	$ 20.000,00	33	5	t	4	8
44	100% Hemp Protein 900 g	La salud, el bienestar general, el cambio climático y el bienestar de los animales hacen que cada vez más personas lleven un estilo de vida basado en las plantas. Nos comprometemos a ayudarte a alcanzar tus objetivos de fitness, tanto si sigues una dieta vegana como si simplemente estás explorando diferentes opciones.	https://static.sscontent.com/thumb/1500/1500/products/124/v1140866_prozis_100-hemp-protein-900-g_newin.jpg	$ 12.000,00	33	5	t	4	12
45	Zero Creatine 300 g	La creatina es una sustancia endógena (producida en el organismo) que está presente en todas las células humanas. Es el suplemento más eficaz que existe actualmente en el mercado para mejorar el rendimiento físico.	https://static.sscontent.com/thumb/1500/1500/products/124/v1223599_prozis_zero-creatine-300-g_lime-lemon_newin_flavor.jpg	$ 4.300,00	33	5	t	4	5
46	Creatine Monohydrate 150 g	La creatina es un compuesto aminoácido natural que se encuentra principalmente en la carne roja y el marisco. La mayor parte de la creatina (~95%) se encuentra en el músculo esquelético y aproximadamente dos tercios de la creatina intramuscular es fosfocreatina, mientras que el resto es creatina libre.	https://static.sscontent.com/thumb/1500/1500/products/124/v1101690_prozis_creatine-monohydrate-150-g_newin.jpg	$ 12.000,00	33	5	t	4	5
47	Creatine Creapure® 300 g	Simple y llanamente: pregunte a los atletas que practican deportes de fuerza y potencia, y todos le dirán que la creatina puso patas arriba el mundo del deporte. Con el tiempo, la ciencia ha demostrado que la creatina cumple todos los criterios para ser considerada un suplemento seguro y extremadamente valioso, cuando se toma correctamente.	https://static.sscontent.com/thumb/1500/1500/products/124/v1208305_prozis_creatine-creapure-300-g_natural_newin_flavor.jpg	$ 10.000,00	33	5	t	4	5
48	Advanced Combat RVK T-Shirt - Dark Green Melange	RevoKnit es una avanzada tecnología de punto que crea prendas de alto rendimiento, similares a la piel, con mayor elasticidad, sujeción y comodidad.	https://static.sscontent.com/prodimg/products/124/v1181483_prozis_advanced-combat-rvk-t-shirt-dark-green-melange_s_dark-green-melange_newin.jpg	$ 5.500,00	33	3	t	5	14
49	Clubhouse Long sleeve T-shirt - Light Gray	Algodón naturalmente suave y ventilado mejorado con propiedades de secado rápido y evacuación acelerada de la humedad.	https://static.sscontent.com/prodimg/products/124/v1174933_prozis_clubhouse-long-sleeve-t-shirt-light-gray_s_light-gray_newin.jpg	$ 6.300,00	33	3	t	5	14
50	Clubhouse Long sleeve T-shirt - Black	Algodón naturalmente suave y ventilado mejorado con propiedades de secado rápido y evacuación acelerada de la humedad.	https://static.sscontent.com/prodimg/products/124/v1174668_prozis_clubhouse-long-sleeve-t-shirt-black_s_black_newin.jpg	$ 6.100,00	33	3	t	5	14
51	Staple Men T-Shirt - Black	La Staple es una camiseta sencilla pero de alto rendimiento. Ofrece unas propiedades óptimas de evacuación de la humedad y secado rápido, perfectas para entrenamientos de actividad intensa.	https://static.sscontent.com/prodimg/products/124/v940449_prozis_staple-men-t-shirt-black_s_black_newin.jpg	$ 4.500,00	33	3	t	5	14
52	Peak NRG Compressive Shorts - Black	Está diseñado para navegar y responder a las duras condiciones presentes en el siempre cambiante paisaje urbano. Todas las prendas se conciben como una expresión de propósito y se confeccionan con materiales de vanguardia mediante técnicas avanzadas y centradas en el detalle.	https://static.sscontent.com/prodimg/products/124/v927084_prozis_peak-nrg-compressive-shorts-black_s_black_newin.jpg	$ 17.000,00	33	3	t	5	15
54	Supercharger Comptech Leggings - Black	Piezas sin costuras diseñadas para ayudarte a batir tus récords personales. Cada prenda se ha creado para que se adapte perfectamente a tu cuerpo, porque el movimiento y la comodidad nunca deben verse comprometidos.	https://static.sscontent.com/prodimg/products/124/v1179084_prozis_supercharger-comptech-leggings-black_s_black_newin.jpg	$ 17.000,00	33	3	t	5	16
55	24/7 Superblend Cushioned Crew Socks - Neon Yellow	Con nuestra fibra especial 24/7©, hemos creado unos calcetines transpirables, que absorben la humedad y muy cómodos.	https://static.sscontent.com/prodimg/products/124/v1238759_prozis_247-superblend-cushioned-crew-socks-neon-yellow_3638_neon-yellow_newin.jpg	$ 3.200,00	33	3	t	5	18
56	24/7 Cushioned Crew Socks - Black	Con nuestra fibra especial 24/7©, hemos creado unos calcetines transpirables, que absorben la humedad y muy cómodos.	https://static.sscontent.com/prodimg/products/124/v1203340_prozis_247-cushioned-crew-socks-black_3638_black_newin.jpg	$ 3.200,00	33	3	t	5	18
57	24/7 Cushioned Crew Socks - White	Con nuestra fibra especial 24/7©, hemos creado unos calcetines transpirables, que absorben la humedad y muy cómodos.	https://static.sscontent.com/prodimg/products/124/v1198108_prozis_247-cushioned-crew-socks-white_3638_white_newin.jpg	$ 3.200,00	33	3	t	5	18
58	Supersonic Sneakers - Green / Blue	Presentamos nuestra nueva y exclusiva zapatilla diseñada para ser resistente, muy cómoda y súper llamativa. La Supersonic está fabricada con un resistente ripstop de poliéster de secado rápido y superposiciones de TPU soldadas.	https://static.sscontent.com/prodimg/products/124/v881306_prozis_supersonic-sneakers-green--blue_eu-40_green--blue_newin.jpg	$ 80.000,00	33	1	t	6	23
59	Destroyer 3.0 Sneakers - Super Black	Presentamos nuestra nueva y exclusiva zapatilla diseñada para ser resistente, muy cómoda y súper llamativa. La Supersonic está fabricada con un resistente ripstop de poliéster de secado rápido y superposiciones de TPU soldadas.	https://static.sscontent.com/prodimg/products/124/v1041647_prozis_destroyer-30-sneakers-super-black_eu-36_black_newin.jpg	$ 75.000,00	33	1	t	6	23
60	Ubiq HR Smartwatch	Es el momento de que la tecnología te lleve más lejos. Es el momento de reconsiderar el verdadero significado de un reloj y dejar que se convierta en un objeto indispensable con las funciones más inteligentes que jamás hayas imaginado.	https://static.sscontent.com/prodimg/products/124/v997442_prozis_ubiq-hr-smartwatch_single-size_no-code_newin.jpg	$ 47.000,00	33	3	t	11	44
61	Calibre Watch - Metallic Silver	Los relojes son la encarnación de nuestros valores fundamentales de calidad suprema, rendimiento inigualable y diseño excepcional.\nCada pieza ha sido concebida para ayudarle a superarse a sí mismo cada día, cada minuto y cada segundo.	https://static.sscontent.com/prodimg/products/124/v840772_prozis_calibre-watch-metallic-silver_single-size_no-code_newin.jpg	$ 45.000,00	33	5	t	11	44
62	Balance Cork Mat - Natural Cork/Black	Diseñado para todo tipo de yoga y pilates, y para todos los ejercicios de peso corporal que se te ocurran. Nada supera la sensación natural del corcho bajo los pies y las manos.	https://static.sscontent.com/prodimg/products/124/v1084593_prozis_balance-cork-mat-natural-corkblack_single-size_natural-cork--black_newin.jpg	$ 6.500,00	33	5	t	9	41
63	Strong Band - Full-body resistance band	Las bandas de resistencia no ocupan espacio y son perfectas para entrenar en casa, aunque vivas en un apartamento pequeño. ¿Y por qué no llevárselas a un viaje de negocios y tenerlas siempre a mano cuando las necesite? Las bandas de resistencia son uno de los equipos más funcionales y eficaces por múltiples razones. Pueden utilizarse para el entrenamiento de fuerza y para ejercicios de movilidad y rehabilitación.	https://static.sscontent.com/prodimg/products/124/v1022854_prozis_elastic-bands-tf-strong_single-size_no-code_newin.jpg	$ 8.700,00	33	3	t	9	43
64	X-Speed Smart Jump Rope	Hacer un seguimiento de tus logros deportivos es una forma sólida de entrenar de forma más inteligente y esforzarte más. Por lo tanto, si está buscando un nuevo aparato de fitness que pueda ayudarle a llevar su rendimiento al siguiente nivel, tenemos la solución perfecta para usted: X-Speed Smart Jump Rope.	https://static.sscontent.com/prodimg/products/124/v1170424_prozis_x-speed-smart-jump-rope_single-size_no-code_newin.jpg	$ 5.300,00	33	5	t	7	31
65	WaterWorks Medium Kettlebell - Gray	Presentamos la dinámica WaterWorks©, donde el ejercicio sigue la corriente.\nConstruye y desarrolla músculo, gana fuerza y fortalece articulaciones y ligamentos.	https://static.sscontent.com/prodimg/products/124/v1012435_prozis_waterworks-medium-kettlebell-gray_single-size_gray_newin.jpg	$ 13.500,00	33	5	t	8	34
66	H2gO - Water Dumbbells	Estés donde estés, siempre hay una forma cómoda de mantenerte en forma. Emprende un viaje sin peso con una maleta ligera como una pluma, y llena tus mancuernas de agua en tu destino para conseguir el peso que necesitas para tus ejercicios. ¿Y por qué no llevarlas a la piscina y hacer ejercicio en el agua?	https://static.sscontent.com/prodimg/products/124/v1156716_prozis_h2go-water-dumbbells_single-size_no-code_newin.jpg	$ 21.000,00	33	6	t	8	34
\.


--
-- TOC entry 3562 (class 0 OID 33394)
-- Dependencies: 222
-- Data for Name: productos_proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos_proveedores (id, precio, estado, id_producto, id_proveedor) FROM stdin;
1	$ 6.300,00	f	1	1
2	$ 7.500,00	f	2	1
3	$ 12.000,00	f	3	1
\.


--
-- TOC entry 3560 (class 0 OID 33375)
-- Dependencies: 220
-- Data for Name: proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedores (id, nombre, email, telefono, direccion, codigo_postal, estado, id_tipo_iva) FROM stdin;
2	Compras Mayoristas	cmayorista@gmail.com	3513789120	General Paz 123	5000	t	1
3	Suplementos Mayorista	supmay@gmail.com	NULL	Av Alem 123	5000	t	1
12	Proveedor API	proveedorapi@gmail.com	3513876554	Medellin 948	5000	f	1
13	Proveedor Frontend	pf@gmail.com	03513983312	PF 123	5000	t	1
14	Segundo PF Edit	pf2@gmail.com	03513883317	PF 1234	5000	f	1
1	Proveedor S.A.	proveedorsa@gmail.com	3513765567	Av Alem 1051	5000	f	1
\.


--
-- TOC entry 3550 (class 0 OID 33303)
-- Dependencies: 210
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nombre, estado) FROM stdin;
2	Cliente	t
3	Proveedor	t
1	Administrador	t
\.


--
-- TOC entry 3592 (class 0 OID 49461)
-- Dependencies: 252
-- Data for Name: subcategorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategorias (id, nombre, descripcion, estado, id_categoria) FROM stdin;
4	Whey Protein	Proteína en polvo para mejorar la recuperación muscular después del ejercicio.	t	4
5	Creatina Monohidratada	Suplemento utilizado para aumentar la fuerza y la resistencia en los entrenamientos.	t	4
6	BCAA	Aminoácidos de cadena ramificada que ayudan a la recuperación muscular y reducen la fatiga.	t	4
7	Glutamina	Aminoácido utilizado para mejorar la recuperación muscular, reducir el dolor muscular y fortalecer el sistema inmunológico.	t	4
8	Pre-Entreno	Suplemento utilizado antes del ejercicio para mejorar el rendimiento y la energía durante el entrenamiento.	t	4
9	Omega 3	Ácidos grasos esenciales que ayudan a reducir la inflamación y mejorar la salud cardiovascular.	t	4
10	Vitamina D	Vitamina importante para la absorción de calcio y el fortalecimiento de los huesos.	t	4
11	Multivitamínico	Suplemento que contiene una variedad de vitaminas y minerales para mejorar la salud en general.	t	4
12	Proteína Vegana	Proteína en polvo a base de plantas para personas que prefieren evitar productos de origen animal.	t	4
13	Barra Energética	Snack pre-entreno o post-entreno con carbohidratos y proteínas para mejorar la energía y la recuperación muscular.	t	4
14	Camisetas de Entrenamiento	Camisetas de algodón o tejidos técnicos transpirables diseñadas para entrenamientos intensos	t	5
15	Pantalones Cortos de Running	Pantalones cortos ligeros y transpirables diseñados para correr	t	5
16	Leggings de Entrenamiento	Mallas elásticas y transpirables para entrenamientos de alta intensidad	t	5
17	Sudaderas de Entrenamiento	Sudaderas ligeras y transpirables para entrenamientos de alta intensidad	t	5
18	Calcetines Deportivos	Calcetines diseñados para actividades físicas, con soporte para el arco del pie y protección en la zona de los dedos	t	5
19	Ropa de Compresión	Prendas ajustadas y elásticas que ayudan a mejorar la circulación sanguínea y reducir la fatiga muscular	t	5
20	Trajes de Baño Deportivos	Trajes de baño diseñados para actividades acuáticas, como natación y waterpolo, con tejidos resistentes al cloro y al desgaste	t	5
22	Zapatillas para Running	Calzado diseñado para correr, con amortiguación en la suela para reducir el impacto en las articulaciones	t	6
23	Zapatos de Entrenamiento Cruzado	Calzado versátil para entrenamientos de alta intensidad, con suelas planas y estables para levantamiento de pesas y amortiguación para cardio	t	6
24	Zapatillas de Baloncesto	Calzado diseñado para jugadores de baloncesto, con suelas de goma y soporte para el tobillo para proporcionar estabilidad y tracción en la cancha	t	6
25	Botines de Fútbol	Calzado diseñado para jugar al fútbol, con suelas diseñadas para proporcionar tracción en terrenos de césped artificial o natural	t	6
26	Zapatillas de Tenis	Calzado diseñado para jugar al tenis, con suelas de goma y soporte para el tobillo para proporcionar estabilidad y tracción en la pista	t	6
27	Zapatos de Golf	Calzado diseñado para jugar al golf, con suelas de goma para proporcionar tracción en el campo y soporte para el arco del pie para una mejor postura	t	6
28	Zapatillas de Ciclismo	Calzado diseñado para ciclistas, con suelas rígidas para una mayor eficiencia en la pedalada y cierres de velcro o cordones para un ajuste personalizado	t	6
29	Guantes de Boxeo	Accesorios para deportes de combate, como el boxeo o el kickboxing, para proteger las manos y las muñecas	t	7
30	Pelotas de Baloncesto	Accesorios para el juego de baloncesto, disponibles en diferentes tamaños y materiales para satisfacer las necesidades de los jugadores	t	7
31	Cuerdas para Saltar	Accesorios para entrenamiento cardiovascular, ideales para hacer ejercicios de alta intensidad y mejorar la resistencia	t	7
32	Banda Elástica	Accesorios para entrenamiento de fuerza, útiles para hacer ejercicios de resistencia y mejorar la flexibilidad	t	7
33	Muñequeras	Accesorios para deportes de raqueta, como el tenis o el bádminton, para proteger las muñecas y mejorar el agarre	t	7
34	Máquina de Pesas	Equipamiento para entrenamiento de fuerza, diseñado para trabajar grupos musculares específicos de manera aislada o conjunta	t	8
35	Cinta de Correr	Equipamiento cardiovascular, ideal para hacer ejercicio en casa o en el gimnasio cuando el clima no acompaña	t	8
36	Bicicleta Estática	Equipamiento cardiovascular, ideal para hacer ejercicio en casa o en el gimnasio, diseñada para simular el movimiento de una bicicleta en carretera	t	8
37	Plataforma Vibratoria	Equipamiento para entrenamiento de fuerza y cardiovascular, diseñada para aumentar la resistencia muscular y mejorar la circulación sanguínea	t	8
38	Banco de Pesas	Equipamiento para entrenamiento de fuerza, diseñado para realizar ejercicios de levantamiento de pesas con diferentes ángulos y posiciones	t	8
39	Kit de Entrenamiento en Suspensión	Equipamiento para entrenamiento de fuerza, diseñado para trabajar grupos musculares de manera aislada o conjunta utilizando la gravedad	t	9
40	Pelota de Ejercicio	Equipamiento para entrenamiento de fuerza y equilibrio, diseñado para hacer ejercicios de resistencia y mejorar la postura	t	9
41	Estera de Yoga	Equipamiento para entrenamiento de flexibilidad y equilibrio, diseñado para hacer ejercicios de yoga, pilates y meditación	t	9
42	Barra de Tracción	Equipamiento para entrenamiento de fuerza, diseñado para hacer ejercicios de calistenia, como flexiones y dominadas, utilizando el peso corporal	t	9
43	Banda de Resistencia	Equipamiento para entrenamiento de fuerza y flexibilidad, diseñado para hacer ejercicios de resistencia con diferentes niveles de intensidad	t	9
44	Reloj Deportivo Inteligente	Dispositivo electrónico diseñado para monitorear el rendimiento deportivo, medir la actividad física y la calidad del sueño, disponible en diferentes marcas y modelos	t	11
45	Auriculares Deportivos	Dispositivo electrónico diseñado para escuchar música durante el entrenamiento o competición, disponible en diferentes estilos y modelos	t	11
46	Brazalete Deportivo para Teléfono	Accesorio para teléfono diseñado para sostener el teléfono mientras se hace ejercicio, disponible en diferentes tamaños y modelos	t	11
47	Cámara Deportiva	Dispositivo electrónico diseñado para capturar imágenes y videos durante el entrenamiento o la competición, disponible en diferentes marcas y modelos	t	11
48	Sensor de Ritmo Cardiaco	Dispositivo electrónico diseñado para medir el ritmo cardíaco durante el entrenamiento o competición, disponible en diferentes estilos y modelos	t	11
21	Gorras Deportivas	Gorras diseñadas para actividades físicas al aire libre, con tejidos transpirables y viseras para proteger del sol	t	5
\.


--
-- TOC entry 3564 (class 0 OID 33424)
-- Dependencies: 224
-- Data for Name: tipos_compra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_compra (id, nombre, estado) FROM stdin;
1	Local	t
2	Exterior	t
\.


--
-- TOC entry 3558 (class 0 OID 33368)
-- Dependencies: 218
-- Data for Name: tipos_iva; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_iva (id, nombre, descripcion, estado) FROM stdin;
1	I	Responsable Inscripto	t
2	M	Monotributista	t
3	C	Consumidor Final	t
\.


--
-- TOC entry 3590 (class 0 OID 33696)
-- Dependencies: 250
-- Data for Name: tipos_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_pago (id, nombre, estado) FROM stdin;
1	Efectivo	t
2	Transferencia	t
3	MercadoPago	t
4	Stripe	t
\.


--
-- TOC entry 3552 (class 0 OID 33311)
-- Dependencies: 212
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, apellido, email, password, token_confirmacion, cuenta_confirmada, direccion, codigo_postal, telefono, fecha_nacimiento, estado, id_rol, fecha_creacion) FROM stdin;
122	Juan	Perez	juan@example.com	hashed_password	\N	t	Calle Principal 123	12345	\N	\N	t	2	2023-01-01
123	María	López	maria@example.com	hashed_password	\N	t	Avenida Central 456	54321	\N	\N	t	2	2023-06-15
124	Carlos	González	carlos@example.com	hashed_password	\N	t	Calle Secundaria 789	98765	\N	\N	t	2	2023-12-31
125	John	Doe	johndoe@example.com	hashed_password_1	\N	t	123 Main St	12345	\N	\N	t	2	2023-01-01
126	Jane	Smith	janesmith@example.com	hashed_password_2	\N	t	456 Oak Ave	54321	\N	\N	t	2	2023-01-02
127	Michael	Johnson	michaeljohnson@example.com	hashed_password_3	\N	t	789 Elm Rd	98765	\N	\N	t	2	2023-01-03
128	Emily	Brown	emilybrown@example.com	hashed_password_100	\N	t	321 Pine Ln	67890	\N	\N	t	2	2023-04-11
90	Fabrizzio	Lo Presti	fabryedm2@gmail.com	$2b$10$nm9Dgy4NCUpsn9LJlzU7Gu5TNJhxj6O7GUx7tKh8evV.BME13vQfK	\N	t	Medellin 948	5000	3513981317	1999-08-03	t	1	2023-05-03
103	Fabrizzio	Lo Presti	fabryedm@gmail.com	$2b$10$2U3tJ52HVQCbwweSp3eBPuHAbzwdM7qyJwlb1fqTciTG2n3CHKBHe	\N	t	Medellin 948	5000	3513983317	1999-08-03	t	1	2023-05-11
114	Usuario Prueba	Usuario Prueba	usuario@gmail.com	$2b$10$VtNQ.Cbwm18TRoWXnOPDseXV.9LFPjvdJzJwahABmhVr.fQe5uJmW	\N	t	Medellin	5000	\N	\N	t	2	2023-03-21
116	Fabrizzio Mauro	Lo Presti	fabrizziolopresti1999@gmail.com	$2b$10$JofjVIizT2fwSAySJaYbVOn3HksC5S2Wbh2UZcovTMyWB5gh6.Ww2	\N	t	Medellin 948	3000	\N	\N	t	2	2023-05-03
136	Sofía	López	sofia@example.com	hashed_password_1	\N	t	Calle Mayor 123	28001	\N	\N	t	2	2023-01-01
137	Martín	Torres	martin@example.com	hashed_password_2	\N	t	Avenida Central 456	28002	\N	\N	t	2	2023-01-02
138	Valentina	González	valentina@example.com	hashed_password_3	\N	t	Calle Secundaria 789	28003	\N	\N	t	2	2023-01-03
139	Emilio	Ruiz	emilio@example.com	hashed_password_4	\N	t	Plaza Principal 10	28004	\N	\N	t	2	2023-01-04
140	Isabella	Santos	isabella@example.com	hashed_password_100	\N	t	Avenida Libertad 20	28005	\N	\N	t	2	2023-04-11
117	Fabrizzio Mauro	Lo Presti	112713@tecnicatura.frc.utn.edu.ar	$2b$10$L27wvTU2H4X/XJ.BG9lVd.gx/9aXCUFm8oQKQz75mENKUnG2F/JSi	\N	t	Medellin 948	5000	\N	\N	t	2	2023-06-02
118	Marcelo	Alvear	malvear@gmail.com	$2b$10$64nFfExxNdz5oqiGHJbLIevOLgRlpGN6/V8QjuejGFk6Ey8e1zGjS	\N	t	Colon 1231	5000	\N	\N	t	2	2023-10-03
119	Jose	Perez	jperez@gmail.com	$2b$10$eUS5HWPaaIeISbAVJPf/gek/a30pmuKrULI7NuwcKU/js/LTOiVEG	\N	t	Rancagua 3200	5000	03513983312	1993-05-12	t	2	2023-05-12
120	Mauricio	Caceres	mcaceres@gmail.com	$2b$10$QXF8Jw7bg8gzNpvV4pSLWeAJ9zHn7Qy6oa6yv0fuo5tKZV7SANpSC	\N	t	Av. Alem 2132	5000	\N	\N	t	2	2023-09-03
121	Lorenzo	Magallanes	lmagallanes@gmail.com	$2b$10$1SaVh63SCX2Q5gBkwDUk2.et/Jmel8QTuGWaRdVV5QuIoYjGfZ9mu	\N	t	Managua 7100	5000	0351478853	1970-05-07	t	2	2023-09-21
\.


--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 247
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banners_id_seq', 1, false);


--
-- TOC entry 3624 (class 0 OID 0)
-- Dependencies: 253
-- Name: carrito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carrito_id_seq', 47, true);


--
-- TOC entry 3625 (class 0 OID 0)
-- Dependencies: 213
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_seq', 20, true);


--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 241
-- Name: cupones_descuento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cupones_descuento_id_seq', 1, false);


--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 235
-- Name: detalles_facturas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalles_facturas_id_seq', 198, true);


--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 229
-- Name: detalles_np_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalles_np_id_seq', 86, true);


--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 243
-- Name: detalles_pedidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalles_pedidos_id_seq', 1, false);


--
-- TOC entry 3630 (class 0 OID 0)
-- Dependencies: 233
-- Name: estados_factura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estados_factura_id_seq', 4, true);


--
-- TOC entry 3631 (class 0 OID 0)
-- Dependencies: 225
-- Name: estados_np_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estados_np_id_seq', 4, true);


--
-- TOC entry 3632 (class 0 OID 0)
-- Dependencies: 237
-- Name: estados_pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estados_pedido_id_seq', 3, true);


--
-- TOC entry 3633 (class 0 OID 0)
-- Dependencies: 231
-- Name: facturas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facturas_id_seq', 147, true);


--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 245
-- Name: ganancias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ganancias_id_seq', 12, true);


--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 227
-- Name: notas_pedido_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notas_pedido_id_seq', 17, true);


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 239
-- Name: pedidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedidos_id_seq', 1, false);


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 215
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 66, true);


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 221
-- Name: productos_proveedores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_proveedores_id_seq', 3, true);


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 219
-- Name: proveedores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedores_id_seq', 14, true);


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 209
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 251
-- Name: subcategorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategorias_id_seq', 52, true);


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 223
-- Name: tipos_compra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_compra_id_seq', 2, true);


--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 217
-- Name: tipos_iva_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_iva_id_seq', 3, true);


--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 249
-- Name: tipos_pago_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_pago_id_seq', 4, true);


--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 211
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 140, true);


--
-- TOC entry 3379 (class 2606 OID 33694)
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);


--
-- TOC entry 3386 (class 2606 OID 49526)
-- Name: carrito carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);


--
-- TOC entry 3345 (class 2606 OID 33341)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- TOC entry 3373 (class 2606 OID 33633)
-- Name: cupones_descuento cupones_descuento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupones_descuento
    ADD CONSTRAINT cupones_descuento_pkey PRIMARY KEY (id);


--
-- TOC entry 3367 (class 2606 OID 33563)
-- Name: detalles_facturas detalles_facturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_facturas
    ADD CONSTRAINT detalles_facturas_pkey PRIMARY KEY (id);


--
-- TOC entry 3361 (class 2606 OID 33495)
-- Name: detalles_np detalles_np_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_np
    ADD CONSTRAINT detalles_np_pkey PRIMARY KEY (id);


--
-- TOC entry 3375 (class 2606 OID 33640)
-- Name: detalles_pedidos detalles_pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_pedidos
    ADD CONSTRAINT detalles_pedidos_pkey PRIMARY KEY (id);


--
-- TOC entry 3365 (class 2606 OID 33534)
-- Name: estados_factura estados_factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_factura
    ADD CONSTRAINT estados_factura_pkey PRIMARY KEY (id);


--
-- TOC entry 3357 (class 2606 OID 33436)
-- Name: estados_np estados_np_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_np
    ADD CONSTRAINT estados_np_pkey PRIMARY KEY (id);


--
-- TOC entry 3369 (class 2606 OID 33593)
-- Name: estados_pedido estados_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_pedido
    ADD CONSTRAINT estados_pedido_pkey PRIMARY KEY (id);


--
-- TOC entry 3363 (class 2606 OID 33526)
-- Name: facturas facturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id);


--
-- TOC entry 3377 (class 2606 OID 33672)
-- Name: ganancias ganancias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ganancias
    ADD CONSTRAINT ganancias_pkey PRIMARY KEY (id);


--
-- TOC entry 3359 (class 2606 OID 33443)
-- Name: notas_pedido notas_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT notas_pedido_pkey PRIMARY KEY (id);


--
-- TOC entry 3371 (class 2606 OID 33601)
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


--
-- TOC entry 3347 (class 2606 OID 33352)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 3353 (class 2606 OID 33400)
-- Name: productos_proveedores productos_proveedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos_proveedores
    ADD CONSTRAINT productos_proveedores_pkey PRIMARY KEY (id);


--
-- TOC entry 3351 (class 2606 OID 33381)
-- Name: proveedores proveedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (id);


--
-- TOC entry 3339 (class 2606 OID 33309)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3383 (class 2606 OID 49466)
-- Name: subcategorias subcategorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_pkey PRIMARY KEY (id);


--
-- TOC entry 3355 (class 2606 OID 33429)
-- Name: tipos_compra tipos_compra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_compra
    ADD CONSTRAINT tipos_compra_pkey PRIMARY KEY (id);


--
-- TOC entry 3349 (class 2606 OID 33373)
-- Name: tipos_iva tipos_iva_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_iva
    ADD CONSTRAINT tipos_iva_pkey PRIMARY KEY (id);


--
-- TOC entry 3381 (class 2606 OID 33702)
-- Name: tipos_pago tipos_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_pago
    ADD CONSTRAINT tipos_pago_pkey PRIMARY KEY (id);


--
-- TOC entry 3342 (class 2606 OID 33320)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 3384 (class 1259 OID 49543)
-- Name: carrito_id_usuario_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX carrito_id_usuario_key ON public.carrito USING btree (id_usuario);


--
-- TOC entry 3340 (class 1259 OID 49459)
-- Name: usuarios_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email);


--
-- TOC entry 3343 (class 1259 OID 57727)
-- Name: usuarios_token_confirmacion_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX usuarios_token_confirmacion_key ON public.usuarios USING btree (token_confirmacion);


--
-- TOC entry 3409 (class 2606 OID 49533)
-- Name: carrito fk_carrito_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT fk_carrito_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;


--
-- TOC entry 3408 (class 2606 OID 49473)
-- Name: subcategorias fk_categorias_subcategorias; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT fk_categorias_subcategorias FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) NOT VALID;


--
-- TOC entry 3402 (class 2606 OID 33581)
-- Name: detalles_facturas fk_detallesfacturas_facturas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_facturas
    ADD CONSTRAINT fk_detallesfacturas_facturas FOREIGN KEY (id_factura) REFERENCES public.facturas(id) NOT VALID;


--
-- TOC entry 3401 (class 2606 OID 33576)
-- Name: detalles_facturas fk_detallesfacturas_productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_facturas
    ADD CONSTRAINT fk_detallesfacturas_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;


--
-- TOC entry 3397 (class 2606 OID 33513)
-- Name: detalles_np fk_detallesnp_notaspedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_np
    ADD CONSTRAINT fk_detallesnp_notaspedido FOREIGN KEY (id_nota_pedido) REFERENCES public.notas_pedido(id) NOT VALID;


--
-- TOC entry 3406 (class 2606 OID 33658)
-- Name: detalles_pedidos fk_detallespedidos_pedidos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_pedidos
    ADD CONSTRAINT fk_detallespedidos_pedidos FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id) NOT VALID;


--
-- TOC entry 3405 (class 2606 OID 33653)
-- Name: detalles_pedidos fk_detallespedidos_productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_pedidos
    ADD CONSTRAINT fk_detallespedidos_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;


--
-- TOC entry 3398 (class 2606 OID 57712)
-- Name: detalles_np fk_detappesnp_productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_np
    ADD CONSTRAINT fk_detappesnp_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;


--
-- TOC entry 3400 (class 2606 OID 33552)
-- Name: facturas fk_facturas_estadosfactura; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT fk_facturas_estadosfactura FOREIGN KEY (id_estado) REFERENCES public.estados_factura(id) NOT VALID;


--
-- TOC entry 3399 (class 2606 OID 33547)
-- Name: facturas fk_facturas_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT fk_facturas_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;


--
-- TOC entry 3407 (class 2606 OID 33681)
-- Name: ganancias fk_ganancias_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ganancias
    ADD CONSTRAINT fk_ganancias_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;


--
-- TOC entry 3395 (class 2606 OID 33478)
-- Name: notas_pedido fk_notaspedido_estadosnp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_estadosnp FOREIGN KEY (id_estado_np) REFERENCES public.estados_np(id) NOT VALID;


--
-- TOC entry 3394 (class 2606 OID 33473)
-- Name: notas_pedido fk_notaspedido_proveedor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_proveedor FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) NOT VALID;


--
-- TOC entry 3396 (class 2606 OID 33483)
-- Name: notas_pedido fk_notaspedido_tiposcompra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_tiposcompra FOREIGN KEY (id_tipo_compra) REFERENCES public.tipos_compra(id) NOT VALID;


--
-- TOC entry 3393 (class 2606 OID 33468)
-- Name: notas_pedido fk_notaspedido_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;


--
-- TOC entry 3404 (class 2606 OID 33619)
-- Name: pedidos fk_pedidos_estadospedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedidos_estadospedido FOREIGN KEY (id_estado_pedido) REFERENCES public.estados_pedido(id) NOT VALID;


--
-- TOC entry 3403 (class 2606 OID 33614)
-- Name: pedidos fk_pedidos_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedidos_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;


--
-- TOC entry 3388 (class 2606 OID 33361)
-- Name: productos fk_productos_categorias; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_productos_categorias FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) NOT VALID;


--
-- TOC entry 3389 (class 2606 OID 49486)
-- Name: productos fk_productos_subcategorias; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_productos_subcategorias FOREIGN KEY (id_subcategoria) REFERENCES public.subcategorias(id) NOT VALID;


--
-- TOC entry 3391 (class 2606 OID 33413)
-- Name: productos_proveedores fk_productosproveedores_productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos_proveedores
    ADD CONSTRAINT fk_productosproveedores_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;


--
-- TOC entry 3392 (class 2606 OID 33418)
-- Name: productos_proveedores fk_productosproveedores_proveedores; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos_proveedores
    ADD CONSTRAINT fk_productosproveedores_proveedores FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) NOT VALID;


--
-- TOC entry 3390 (class 2606 OID 33388)
-- Name: proveedores fk_proveedores_tiposiva; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT fk_proveedores_tiposiva FOREIGN KEY (id_tipo_iva) REFERENCES public.tipos_iva(id) NOT VALID;


--
-- TOC entry 3387 (class 2606 OID 33329)
-- Name: usuarios fk_usuarios_roles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuarios_roles FOREIGN KEY (id_rol) REFERENCES public.roles(id) NOT VALID;


-- Completed on 2023-06-08 08:35:59

--
-- PostgreSQL database dump complete
--


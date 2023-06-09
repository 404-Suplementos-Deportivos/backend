PGDMP     &                    {            ecommerce404    14.2    15.3 �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    33085    ecommerce404    DATABASE     �   CREATE DATABASE ecommerce404 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE ecommerce404;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    33687    banners    TABLE     �   CREATE TABLE public.banners (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    descripcion character varying(120) NOT NULL,
    url_imagen character varying NOT NULL
);
    DROP TABLE public.banners;
       public         heap    postgres    false    4            �            1259    33686    banners_id_seq    SEQUENCE     �   CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.banners_id_seq;
       public          postgres    false    248    4                       0    0    banners_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;
          public          postgres    false    247            �            1259    49521    carrito    TABLE     y   CREATE TABLE public.carrito (
    id integer NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    productos jsonb
);
    DROP TABLE public.carrito;
       public         heap    postgres    false    4            �            1259    49520    carrito_id_seq    SEQUENCE     �   CREATE SEQUENCE public.carrito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.carrito_id_seq;
       public          postgres    false    4    254                       0    0    carrito_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.carrito_id_seq OWNED BY public.carrito.id;
          public          postgres    false    253            �            1259    33335 
   categorias    TABLE     �   CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    descripcion character varying(200),
    estado boolean DEFAULT true NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    postgres    false    4            �            1259    33334    categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categorias_id_seq;
       public          postgres    false    4    214                       0    0    categorias_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;
          public          postgres    false    213            �            1259    33626    cupones_descuento    TABLE     �   CREATE TABLE public.cupones_descuento (
    id integer NOT NULL,
    codigo character varying(15) NOT NULL,
    fecha_vencimiento date NOT NULL,
    descuento numeric NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
 %   DROP TABLE public.cupones_descuento;
       public         heap    postgres    false    4            �            1259    33625    cupones_descuento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cupones_descuento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.cupones_descuento_id_seq;
       public          postgres    false    242    4                       0    0    cupones_descuento_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.cupones_descuento_id_seq OWNED BY public.cupones_descuento.id;
          public          postgres    false    241            �            1259    33558    detalles_facturas    TABLE     �   CREATE TABLE public.detalles_facturas (
    id integer NOT NULL,
    cantidad integer NOT NULL,
    precio numeric(14,2) NOT NULL,
    descuento integer NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL,
    id_factura integer DEFAULT 0 NOT NULL
);
 %   DROP TABLE public.detalles_facturas;
       public         heap    postgres    false    4            �            1259    33557    detalles_facturas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detalles_facturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.detalles_facturas_id_seq;
       public          postgres    false    4    236                       0    0    detalles_facturas_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.detalles_facturas_id_seq OWNED BY public.detalles_facturas.id;
          public          postgres    false    235            �            1259    33490    detalles_np    TABLE     F  CREATE TABLE public.detalles_np (
    id integer NOT NULL,
    cantidad_pedida integer NOT NULL,
    cantidad_recibida integer NOT NULL,
    precio numeric(14,2) NOT NULL,
    descuento integer NOT NULL,
    estado boolean NOT NULL,
    id_nota_pedido integer DEFAULT 0 NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.detalles_np;
       public         heap    postgres    false    4            �            1259    33489    detalles_np_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detalles_np_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.detalles_np_id_seq;
       public          postgres    false    230    4                       0    0    detalles_np_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.detalles_np_id_seq OWNED BY public.detalles_np.id;
          public          postgres    false    229            �            1259    33635    detalles_pedidos    TABLE     �   CREATE TABLE public.detalles_pedidos (
    id integer NOT NULL,
    cantidad integer NOT NULL,
    precio numeric(14,2) NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL,
    id_pedido integer DEFAULT 0 NOT NULL
);
 $   DROP TABLE public.detalles_pedidos;
       public         heap    postgres    false    4            �            1259    33634    detalles_pedidos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.detalles_pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.detalles_pedidos_id_seq;
       public          postgres    false    4    244                       0    0    detalles_pedidos_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.detalles_pedidos_id_seq OWNED BY public.detalles_pedidos.id;
          public          postgres    false    243            �            1259    33528    estados_factura    TABLE     �   CREATE TABLE public.estados_factura (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
 #   DROP TABLE public.estados_factura;
       public         heap    postgres    false    4            �            1259    33527    estados_factura_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_factura_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.estados_factura_id_seq;
       public          postgres    false    4    234                       0    0    estados_factura_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.estados_factura_id_seq OWNED BY public.estados_factura.id;
          public          postgres    false    233            �            1259    33431 
   estados_np    TABLE     �   CREATE TABLE public.estados_np (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
    DROP TABLE public.estados_np;
       public         heap    postgres    false    4            �            1259    33430    estados_np_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_np_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.estados_np_id_seq;
       public          postgres    false    4    226                       0    0    estados_np_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.estados_np_id_seq OWNED BY public.estados_np.id;
          public          postgres    false    225            �            1259    33587    estados_pedido    TABLE     �   CREATE TABLE public.estados_pedido (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
 "   DROP TABLE public.estados_pedido;
       public         heap    postgres    false    4            �            1259    33586    estados_pedido_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.estados_pedido_id_seq;
       public          postgres    false    4    238                       0    0    estados_pedido_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.estados_pedido_id_seq OWNED BY public.estados_pedido.id;
          public          postgres    false    237            �            1259    33520    facturas    TABLE     �   CREATE TABLE public.facturas (
    id integer NOT NULL,
    fecha date NOT NULL,
    fecha_vencimiento date NOT NULL,
    numero_factura bigint DEFAULT 0 NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_estado integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.facturas;
       public         heap    postgres    false    4            �            1259    33518    facturas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.facturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.facturas_id_seq;
       public          postgres    false    232    4                       0    0    facturas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.facturas_id_seq OWNED BY public.facturas.id;
          public          postgres    false    231            �            1259    33665 	   ganancias    TABLE     �   CREATE TABLE public.ganancias (
    id integer NOT NULL,
    vigencia date NOT NULL,
    porcentaje numeric(5,2) DEFAULT 0 NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.ganancias;
       public         heap    postgres    false    4            �            1259    33664    ganancias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ganancias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.ganancias_id_seq;
       public          postgres    false    4    246                       0    0    ganancias_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.ganancias_id_seq OWNED BY public.ganancias.id;
          public          postgres    false    245            �            1259    33438    notas_pedido    TABLE     N  CREATE TABLE public.notas_pedido (
    id integer NOT NULL,
    fecha date NOT NULL,
    version integer NOT NULL,
    fecha_vencimiento date NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_proveedor integer DEFAULT 0 NOT NULL,
    id_estado_np integer DEFAULT 0 NOT NULL,
    id_tipo_compra integer DEFAULT 0 NOT NULL
);
     DROP TABLE public.notas_pedido;
       public         heap    postgres    false    4            �            1259    33437    notas_pedido_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notas_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.notas_pedido_id_seq;
       public          postgres    false    4    228                       0    0    notas_pedido_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.notas_pedido_id_seq OWNED BY public.notas_pedido.id;
          public          postgres    false    227            �            1259    33596    pedidos    TABLE     �   CREATE TABLE public.pedidos (
    id integer NOT NULL,
    fecha date NOT NULL,
    descuento integer NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_estado_pedido integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.pedidos;
       public         heap    postgres    false    4            �            1259    33595    pedidos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pedidos_id_seq;
       public          postgres    false    240    4                       0    0    pedidos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;
          public          postgres    false    239            �            1259    33343 	   productos    TABLE     �  CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(80) NOT NULL,
    descripcion character varying(600) NOT NULL,
    url_imagen character varying NOT NULL,
    precio_lista numeric(9,2) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    stock_minimo integer NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    id_categoria integer DEFAULT 0 NOT NULL,
    id_subcategoria integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.productos;
       public         heap    postgres    false    4            �            1259    33342    productos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.productos_id_seq;
       public          postgres    false    4    216                        0    0    productos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;
          public          postgres    false    215            �            1259    33394    productos_proveedores    TABLE     �   CREATE TABLE public.productos_proveedores (
    id integer NOT NULL,
    precio numeric(9,2) NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    id_producto integer DEFAULT 0 NOT NULL,
    id_proveedor integer DEFAULT 0 NOT NULL
);
 )   DROP TABLE public.productos_proveedores;
       public         heap    postgres    false    4            �            1259    33393    productos_proveedores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_proveedores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.productos_proveedores_id_seq;
       public          postgres    false    222    4            !           0    0    productos_proveedores_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.productos_proveedores_id_seq OWNED BY public.productos_proveedores.id;
          public          postgres    false    221            �            1259    33375    proveedores    TABLE     g  CREATE TABLE public.proveedores (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    telefono character varying(30) NOT NULL,
    direccion character varying(60) NOT NULL,
    codigo_postal integer NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    id_tipo_iva integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.proveedores;
       public         heap    postgres    false    4            �            1259    33374    proveedores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proveedores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.proveedores_id_seq;
       public          postgres    false    220    4            "           0    0    proveedores_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.proveedores_id_seq OWNED BY public.proveedores.id;
          public          postgres    false    219            �            1259    33303    roles    TABLE     �   CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre character varying(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false    4            �            1259    33302    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    210    4            #           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    209            �            1259    49461    subcategorias    TABLE     �   CREATE TABLE public.subcategorias (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    descripcion character varying(200),
    estado boolean DEFAULT true NOT NULL,
    id_categoria integer DEFAULT 0 NOT NULL
);
 !   DROP TABLE public.subcategorias;
       public         heap    postgres    false    4            �            1259    49460    subcategorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subcategorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.subcategorias_id_seq;
       public          postgres    false    252    4            $           0    0    subcategorias_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.subcategorias_id_seq OWNED BY public.subcategorias.id;
          public          postgres    false    251            �            1259    33424    tipos_compra    TABLE     �   CREATE TABLE public.tipos_compra (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
     DROP TABLE public.tipos_compra;
       public         heap    postgres    false    4            �            1259    33423    tipos_compra_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_compra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tipos_compra_id_seq;
       public          postgres    false    4    224            %           0    0    tipos_compra_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tipos_compra_id_seq OWNED BY public.tipos_compra.id;
          public          postgres    false    223            �            1259    33368 	   tipos_iva    TABLE     �   CREATE TABLE public.tipos_iva (
    id integer NOT NULL,
    nombre character varying(15) NOT NULL,
    descripcion character varying(80) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
    DROP TABLE public.tipos_iva;
       public         heap    postgres    false    4            �            1259    33367    tipos_iva_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_iva_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.tipos_iva_id_seq;
       public          postgres    false    4    218            &           0    0    tipos_iva_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.tipos_iva_id_seq OWNED BY public.tipos_iva.id;
          public          postgres    false    217            �            1259    33696 
   tipos_pago    TABLE     �   CREATE TABLE public.tipos_pago (
    id integer NOT NULL,
    nombre character varying(15) NOT NULL,
    estado boolean DEFAULT true NOT NULL
);
    DROP TABLE public.tipos_pago;
       public         heap    postgres    false    4            �            1259    33695    tipos_pago_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_pago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tipos_pago_id_seq;
       public          postgres    false    4    250            '           0    0    tipos_pago_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tipos_pago_id_seq OWNED BY public.tipos_pago.id;
          public          postgres    false    249            �            1259    33311    usuarios    TABLE     S  CREATE TABLE public.usuarios (
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
    DROP TABLE public.usuarios;
       public         heap    postgres    false    4            �            1259    33310    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    4    212            (           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    211                       2604    33690 
   banners id    DEFAULT     h   ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);
 9   ALTER TABLE public.banners ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    248    248                       2604    49524 
   carrito id    DEFAULT     h   ALTER TABLE ONLY public.carrito ALTER COLUMN id SET DEFAULT nextval('public.carrito_id_seq'::regclass);
 9   ALTER TABLE public.carrito ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    253    254            �           2604    33338    categorias id    DEFAULT     n   ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);
 <   ALTER TABLE public.categorias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    33629    cupones_descuento id    DEFAULT     |   ALTER TABLE ONLY public.cupones_descuento ALTER COLUMN id SET DEFAULT nextval('public.cupones_descuento_id_seq'::regclass);
 C   ALTER TABLE public.cupones_descuento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241    242            �           2604    33561    detalles_facturas id    DEFAULT     |   ALTER TABLE ONLY public.detalles_facturas ALTER COLUMN id SET DEFAULT nextval('public.detalles_facturas_id_seq'::regclass);
 C   ALTER TABLE public.detalles_facturas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235    236            �           2604    33493    detalles_np id    DEFAULT     p   ALTER TABLE ONLY public.detalles_np ALTER COLUMN id SET DEFAULT nextval('public.detalles_np_id_seq'::regclass);
 =   ALTER TABLE public.detalles_np ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    33638    detalles_pedidos id    DEFAULT     z   ALTER TABLE ONLY public.detalles_pedidos ALTER COLUMN id SET DEFAULT nextval('public.detalles_pedidos_id_seq'::regclass);
 B   ALTER TABLE public.detalles_pedidos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243    244            �           2604    33531    estados_factura id    DEFAULT     x   ALTER TABLE ONLY public.estados_factura ALTER COLUMN id SET DEFAULT nextval('public.estados_factura_id_seq'::regclass);
 A   ALTER TABLE public.estados_factura ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233    234            �           2604    33434    estados_np id    DEFAULT     n   ALTER TABLE ONLY public.estados_np ALTER COLUMN id SET DEFAULT nextval('public.estados_np_id_seq'::regclass);
 <   ALTER TABLE public.estados_np ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    33590    estados_pedido id    DEFAULT     v   ALTER TABLE ONLY public.estados_pedido ALTER COLUMN id SET DEFAULT nextval('public.estados_pedido_id_seq'::regclass);
 @   ALTER TABLE public.estados_pedido ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    238    238            �           2604    33523    facturas id    DEFAULT     j   ALTER TABLE ONLY public.facturas ALTER COLUMN id SET DEFAULT nextval('public.facturas_id_seq'::regclass);
 :   ALTER TABLE public.facturas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            �           2604    33668    ganancias id    DEFAULT     l   ALTER TABLE ONLY public.ganancias ALTER COLUMN id SET DEFAULT nextval('public.ganancias_id_seq'::regclass);
 ;   ALTER TABLE public.ganancias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245    246            �           2604    33441    notas_pedido id    DEFAULT     r   ALTER TABLE ONLY public.notas_pedido ALTER COLUMN id SET DEFAULT nextval('public.notas_pedido_id_seq'::regclass);
 >   ALTER TABLE public.notas_pedido ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    33599 
   pedidos id    DEFAULT     h   ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);
 9   ALTER TABLE public.pedidos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            �           2604    33346    productos id    DEFAULT     l   ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);
 ;   ALTER TABLE public.productos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    33397    productos_proveedores id    DEFAULT     �   ALTER TABLE ONLY public.productos_proveedores ALTER COLUMN id SET DEFAULT nextval('public.productos_proveedores_id_seq'::regclass);
 G   ALTER TABLE public.productos_proveedores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    33378    proveedores id    DEFAULT     p   ALTER TABLE ONLY public.proveedores ALTER COLUMN id SET DEFAULT nextval('public.proveedores_id_seq'::regclass);
 =   ALTER TABLE public.proveedores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    33306    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210                       2604    49464    subcategorias id    DEFAULT     t   ALTER TABLE ONLY public.subcategorias ALTER COLUMN id SET DEFAULT nextval('public.subcategorias_id_seq'::regclass);
 ?   ALTER TABLE public.subcategorias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    252    252            �           2604    33427    tipos_compra id    DEFAULT     r   ALTER TABLE ONLY public.tipos_compra ALTER COLUMN id SET DEFAULT nextval('public.tipos_compra_id_seq'::regclass);
 >   ALTER TABLE public.tipos_compra ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    33371    tipos_iva id    DEFAULT     l   ALTER TABLE ONLY public.tipos_iva ALTER COLUMN id SET DEFAULT nextval('public.tipos_iva_id_seq'::regclass);
 ;   ALTER TABLE public.tipos_iva ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218                       2604    33699    tipos_pago id    DEFAULT     n   ALTER TABLE ONLY public.tipos_pago ALTER COLUMN id SET DEFAULT nextval('public.tipos_pago_id_seq'::regclass);
 <   ALTER TABLE public.tipos_pago ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249    250            �           2604    33314    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212                      0    33687    banners 
   TABLE DATA           F   COPY public.banners (id, nombre, descripcion, url_imagen) FROM stdin;
    public          postgres    false    248   B�       
          0    49521    carrito 
   TABLE DATA           <   COPY public.carrito (id, id_usuario, productos) FROM stdin;
    public          postgres    false    254   _�       �          0    33335 
   categorias 
   TABLE DATA           E   COPY public.categorias (id, nombre, descripcion, estado) FROM stdin;
    public          postgres    false    214   ��       �          0    33626    cupones_descuento 
   TABLE DATA           ]   COPY public.cupones_descuento (id, codigo, fecha_vencimiento, descuento, estado) FROM stdin;
    public          postgres    false    242   !�       �          0    33558    detalles_facturas 
   TABLE DATA           e   COPY public.detalles_facturas (id, cantidad, precio, descuento, id_producto, id_factura) FROM stdin;
    public          postgres    false    236   >�       �          0    33490    detalles_np 
   TABLE DATA           �   COPY public.detalles_np (id, cantidad_pedida, cantidad_recibida, precio, descuento, estado, id_nota_pedido, id_producto) FROM stdin;
    public          postgres    false    230   ��                  0    33635    detalles_pedidos 
   TABLE DATA           X   COPY public.detalles_pedidos (id, cantidad, precio, id_producto, id_pedido) FROM stdin;
    public          postgres    false    244   ��       �          0    33528    estados_factura 
   TABLE DATA           =   COPY public.estados_factura (id, nombre, estado) FROM stdin;
    public          postgres    false    234   �       �          0    33431 
   estados_np 
   TABLE DATA           8   COPY public.estados_np (id, nombre, estado) FROM stdin;
    public          postgres    false    226   L�       �          0    33587    estados_pedido 
   TABLE DATA           <   COPY public.estados_pedido (id, nombre, estado) FROM stdin;
    public          postgres    false    238   ��       �          0    33520    facturas 
   TABLE DATA           g   COPY public.facturas (id, fecha, fecha_vencimiento, numero_factura, id_usuario, id_estado) FROM stdin;
    public          postgres    false    232   ��                 0    33665 	   ganancias 
   TABLE DATA           I   COPY public.ganancias (id, vigencia, porcentaje, id_usuario) FROM stdin;
    public          postgres    false    246   &�       �          0    33438    notas_pedido 
   TABLE DATA           �   COPY public.notas_pedido (id, fecha, version, fecha_vencimiento, id_usuario, id_proveedor, id_estado_np, id_tipo_compra) FROM stdin;
    public          postgres    false    228   l�       �          0    33596    pedidos 
   TABLE DATA           U   COPY public.pedidos (id, fecha, descuento, id_usuario, id_estado_pedido) FROM stdin;
    public          postgres    false    240   ��       �          0    33343 	   productos 
   TABLE DATA           �   COPY public.productos (id, nombre, descripcion, url_imagen, precio_lista, stock, stock_minimo, estado, id_categoria, id_subcategoria) FROM stdin;
    public          postgres    false    216   ��       �          0    33394    productos_proveedores 
   TABLE DATA           ^   COPY public.productos_proveedores (id, precio, estado, id_producto, id_proveedor) FROM stdin;
    public          postgres    false    222   �      �          0    33375    proveedores 
   TABLE DATA           q   COPY public.proveedores (id, nombre, email, telefono, direccion, codigo_postal, estado, id_tipo_iva) FROM stdin;
    public          postgres    false    220   �      �          0    33303    roles 
   TABLE DATA           3   COPY public.roles (id, nombre, estado) FROM stdin;
    public          postgres    false    210   �                0    49461    subcategorias 
   TABLE DATA           V   COPY public.subcategorias (id, nombre, descripcion, estado, id_categoria) FROM stdin;
    public          postgres    false    252   �      �          0    33424    tipos_compra 
   TABLE DATA           :   COPY public.tipos_compra (id, nombre, estado) FROM stdin;
    public          postgres    false    224   �      �          0    33368 	   tipos_iva 
   TABLE DATA           D   COPY public.tipos_iva (id, nombre, descripcion, estado) FROM stdin;
    public          postgres    false    218   �                0    33696 
   tipos_pago 
   TABLE DATA           8   COPY public.tipos_pago (id, nombre, estado) FROM stdin;
    public          postgres    false    250   E      �          0    33311    usuarios 
   TABLE DATA           �   COPY public.usuarios (id, nombre, apellido, email, password, token_confirmacion, cuenta_confirmada, direccion, codigo_postal, telefono, fecha_nacimiento, estado, id_rol, fecha_creacion) FROM stdin;
    public          postgres    false    212   �      )           0    0    banners_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.banners_id_seq', 1, false);
          public          postgres    false    247            *           0    0    carrito_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.carrito_id_seq', 47, true);
          public          postgres    false    253            +           0    0    categorias_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categorias_id_seq', 20, true);
          public          postgres    false    213            ,           0    0    cupones_descuento_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.cupones_descuento_id_seq', 1, false);
          public          postgres    false    241            -           0    0    detalles_facturas_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.detalles_facturas_id_seq', 206, true);
          public          postgres    false    235            .           0    0    detalles_np_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.detalles_np_id_seq', 92, true);
          public          postgres    false    229            /           0    0    detalles_pedidos_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.detalles_pedidos_id_seq', 1, false);
          public          postgres    false    243            0           0    0    estados_factura_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.estados_factura_id_seq', 4, true);
          public          postgres    false    233            1           0    0    estados_np_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.estados_np_id_seq', 4, true);
          public          postgres    false    225            2           0    0    estados_pedido_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.estados_pedido_id_seq', 3, true);
          public          postgres    false    237            3           0    0    facturas_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.facturas_id_seq', 150, true);
          public          postgres    false    231            4           0    0    ganancias_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.ganancias_id_seq', 12, true);
          public          postgres    false    245            5           0    0    notas_pedido_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.notas_pedido_id_seq', 19, true);
          public          postgres    false    227            6           0    0    pedidos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pedidos_id_seq', 1, false);
          public          postgres    false    239            7           0    0    productos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.productos_id_seq', 68, true);
          public          postgres    false    215            8           0    0    productos_proveedores_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.productos_proveedores_id_seq', 3, true);
          public          postgres    false    221            9           0    0    proveedores_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.proveedores_id_seq', 14, true);
          public          postgres    false    219            :           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 3, true);
          public          postgres    false    209            ;           0    0    subcategorias_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.subcategorias_id_seq', 52, true);
          public          postgres    false    251            <           0    0    tipos_compra_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tipos_compra_id_seq', 2, true);
          public          postgres    false    223            =           0    0    tipos_iva_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.tipos_iva_id_seq', 3, true);
          public          postgres    false    217            >           0    0    tipos_pago_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tipos_pago_id_seq', 4, true);
          public          postgres    false    249            ?           0    0    usuarios_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.usuarios_id_seq', 140, true);
          public          postgres    false    211            3           2606    33694    banners banners_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.banners DROP CONSTRAINT banners_pkey;
       public            postgres    false    248            :           2606    49526    carrito carrito_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_pkey;
       public            postgres    false    254                       2606    33341    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    214            -           2606    33633 (   cupones_descuento cupones_descuento_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.cupones_descuento
    ADD CONSTRAINT cupones_descuento_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.cupones_descuento DROP CONSTRAINT cupones_descuento_pkey;
       public            postgres    false    242            '           2606    33563 (   detalles_facturas detalles_facturas_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.detalles_facturas
    ADD CONSTRAINT detalles_facturas_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.detalles_facturas DROP CONSTRAINT detalles_facturas_pkey;
       public            postgres    false    236            !           2606    33495    detalles_np detalles_np_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.detalles_np
    ADD CONSTRAINT detalles_np_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.detalles_np DROP CONSTRAINT detalles_np_pkey;
       public            postgres    false    230            /           2606    33640 &   detalles_pedidos detalles_pedidos_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.detalles_pedidos
    ADD CONSTRAINT detalles_pedidos_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.detalles_pedidos DROP CONSTRAINT detalles_pedidos_pkey;
       public            postgres    false    244            %           2606    33534 $   estados_factura estados_factura_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.estados_factura
    ADD CONSTRAINT estados_factura_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.estados_factura DROP CONSTRAINT estados_factura_pkey;
       public            postgres    false    234                       2606    33436    estados_np estados_np_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.estados_np
    ADD CONSTRAINT estados_np_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.estados_np DROP CONSTRAINT estados_np_pkey;
       public            postgres    false    226            )           2606    33593 "   estados_pedido estados_pedido_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.estados_pedido
    ADD CONSTRAINT estados_pedido_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.estados_pedido DROP CONSTRAINT estados_pedido_pkey;
       public            postgres    false    238            #           2606    33526    facturas facturas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.facturas DROP CONSTRAINT facturas_pkey;
       public            postgres    false    232            1           2606    33672    ganancias ganancias_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.ganancias
    ADD CONSTRAINT ganancias_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.ganancias DROP CONSTRAINT ganancias_pkey;
       public            postgres    false    246                       2606    33443    notas_pedido notas_pedido_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT notas_pedido_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.notas_pedido DROP CONSTRAINT notas_pedido_pkey;
       public            postgres    false    228            +           2606    33601    pedidos pedidos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pkey;
       public            postgres    false    240                       2606    33352    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    216                       2606    33400 0   productos_proveedores productos_proveedores_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.productos_proveedores
    ADD CONSTRAINT productos_proveedores_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.productos_proveedores DROP CONSTRAINT productos_proveedores_pkey;
       public            postgres    false    222                       2606    33381    proveedores proveedores_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.proveedores DROP CONSTRAINT proveedores_pkey;
       public            postgres    false    220                       2606    33309    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    210            7           2606    49466     subcategorias subcategorias_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT subcategorias_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.subcategorias DROP CONSTRAINT subcategorias_pkey;
       public            postgres    false    252                       2606    33429    tipos_compra tipos_compra_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.tipos_compra
    ADD CONSTRAINT tipos_compra_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.tipos_compra DROP CONSTRAINT tipos_compra_pkey;
       public            postgres    false    224                       2606    33373    tipos_iva tipos_iva_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tipos_iva
    ADD CONSTRAINT tipos_iva_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tipos_iva DROP CONSTRAINT tipos_iva_pkey;
       public            postgres    false    218            5           2606    33702    tipos_pago tipos_pago_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.tipos_pago
    ADD CONSTRAINT tipos_pago_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.tipos_pago DROP CONSTRAINT tipos_pago_pkey;
       public            postgres    false    250                       2606    33320    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    212            8           1259    49543    carrito_id_usuario_key    INDEX     W   CREATE UNIQUE INDEX carrito_id_usuario_key ON public.carrito USING btree (id_usuario);
 *   DROP INDEX public.carrito_id_usuario_key;
       public            postgres    false    254                       1259    49459    usuarios_email_key    INDEX     O   CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email);
 &   DROP INDEX public.usuarios_email_key;
       public            postgres    false    212                       1259    57727    usuarios_token_confirmacion_key    INDEX     i   CREATE UNIQUE INDEX usuarios_token_confirmacion_key ON public.usuarios USING btree (token_confirmacion);
 3   DROP INDEX public.usuarios_token_confirmacion_key;
       public            postgres    false    212            Q           2606    49533    carrito fk_carrito_usuarios    FK CONSTRAINT     �   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT fk_carrito_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;
 E   ALTER TABLE ONLY public.carrito DROP CONSTRAINT fk_carrito_usuarios;
       public          postgres    false    3342    212    254            P           2606    49473 )   subcategorias fk_categorias_subcategorias    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategorias
    ADD CONSTRAINT fk_categorias_subcategorias FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) NOT VALID;
 S   ALTER TABLE ONLY public.subcategorias DROP CONSTRAINT fk_categorias_subcategorias;
       public          postgres    false    3345    252    214            I           2606    33581 .   detalles_facturas fk_detallesfacturas_facturas    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_facturas
    ADD CONSTRAINT fk_detallesfacturas_facturas FOREIGN KEY (id_factura) REFERENCES public.facturas(id) NOT VALID;
 X   ALTER TABLE ONLY public.detalles_facturas DROP CONSTRAINT fk_detallesfacturas_facturas;
       public          postgres    false    232    236    3363            J           2606    33576 /   detalles_facturas fk_detallesfacturas_productos    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_facturas
    ADD CONSTRAINT fk_detallesfacturas_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;
 Y   ALTER TABLE ONLY public.detalles_facturas DROP CONSTRAINT fk_detallesfacturas_productos;
       public          postgres    false    216    236    3347            E           2606    33513 %   detalles_np fk_detallesnp_notaspedido    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_np
    ADD CONSTRAINT fk_detallesnp_notaspedido FOREIGN KEY (id_nota_pedido) REFERENCES public.notas_pedido(id) NOT VALID;
 O   ALTER TABLE ONLY public.detalles_np DROP CONSTRAINT fk_detallesnp_notaspedido;
       public          postgres    false    3359    228    230            M           2606    33658 +   detalles_pedidos fk_detallespedidos_pedidos    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedidos
    ADD CONSTRAINT fk_detallespedidos_pedidos FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id) NOT VALID;
 U   ALTER TABLE ONLY public.detalles_pedidos DROP CONSTRAINT fk_detallespedidos_pedidos;
       public          postgres    false    240    3371    244            N           2606    33653 -   detalles_pedidos fk_detallespedidos_productos    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_pedidos
    ADD CONSTRAINT fk_detallespedidos_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;
 W   ALTER TABLE ONLY public.detalles_pedidos DROP CONSTRAINT fk_detallespedidos_productos;
       public          postgres    false    244    3347    216            F           2606    57712 #   detalles_np fk_detappesnp_productos    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalles_np
    ADD CONSTRAINT fk_detappesnp_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;
 M   ALTER TABLE ONLY public.detalles_np DROP CONSTRAINT fk_detappesnp_productos;
       public          postgres    false    216    230    3347            G           2606    33552 #   facturas fk_facturas_estadosfactura    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT fk_facturas_estadosfactura FOREIGN KEY (id_estado) REFERENCES public.estados_factura(id) NOT VALID;
 M   ALTER TABLE ONLY public.facturas DROP CONSTRAINT fk_facturas_estadosfactura;
       public          postgres    false    234    232    3365            H           2606    33547    facturas fk_facturas_usuarios    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT fk_facturas_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;
 G   ALTER TABLE ONLY public.facturas DROP CONSTRAINT fk_facturas_usuarios;
       public          postgres    false    232    212    3342            O           2606    33681    ganancias fk_ganancias_usuarios    FK CONSTRAINT     �   ALTER TABLE ONLY public.ganancias
    ADD CONSTRAINT fk_ganancias_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;
 I   ALTER TABLE ONLY public.ganancias DROP CONSTRAINT fk_ganancias_usuarios;
       public          postgres    false    212    3342    246            A           2606    33478 %   notas_pedido fk_notaspedido_estadosnp    FK CONSTRAINT     �   ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_estadosnp FOREIGN KEY (id_estado_np) REFERENCES public.estados_np(id) NOT VALID;
 O   ALTER TABLE ONLY public.notas_pedido DROP CONSTRAINT fk_notaspedido_estadosnp;
       public          postgres    false    3357    228    226            B           2606    33473 %   notas_pedido fk_notaspedido_proveedor    FK CONSTRAINT     �   ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_proveedor FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) NOT VALID;
 O   ALTER TABLE ONLY public.notas_pedido DROP CONSTRAINT fk_notaspedido_proveedor;
       public          postgres    false    220    3351    228            C           2606    33483 '   notas_pedido fk_notaspedido_tiposcompra    FK CONSTRAINT     �   ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_tiposcompra FOREIGN KEY (id_tipo_compra) REFERENCES public.tipos_compra(id) NOT VALID;
 Q   ALTER TABLE ONLY public.notas_pedido DROP CONSTRAINT fk_notaspedido_tiposcompra;
       public          postgres    false    224    3355    228            D           2606    33468 $   notas_pedido fk_notaspedido_usuarios    FK CONSTRAINT     �   ALTER TABLE ONLY public.notas_pedido
    ADD CONSTRAINT fk_notaspedido_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;
 N   ALTER TABLE ONLY public.notas_pedido DROP CONSTRAINT fk_notaspedido_usuarios;
       public          postgres    false    212    228    3342            K           2606    33619     pedidos fk_pedidos_estadospedido    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedidos_estadospedido FOREIGN KEY (id_estado_pedido) REFERENCES public.estados_pedido(id) NOT VALID;
 J   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT fk_pedidos_estadospedido;
       public          postgres    false    240    3369    238            L           2606    33614    pedidos fk_pedidos_usuarios    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedidos_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) NOT VALID;
 E   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT fk_pedidos_usuarios;
       public          postgres    false    212    3342    240            <           2606    33361 !   productos fk_productos_categorias    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_productos_categorias FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) NOT VALID;
 K   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_productos_categorias;
       public          postgres    false    214    216    3345            =           2606    49486 $   productos fk_productos_subcategorias    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_productos_subcategorias FOREIGN KEY (id_subcategoria) REFERENCES public.subcategorias(id) NOT VALID;
 N   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_productos_subcategorias;
       public          postgres    false    216    252    3383            ?           2606    33413 7   productos_proveedores fk_productosproveedores_productos    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos_proveedores
    ADD CONSTRAINT fk_productosproveedores_productos FOREIGN KEY (id_producto) REFERENCES public.productos(id) NOT VALID;
 a   ALTER TABLE ONLY public.productos_proveedores DROP CONSTRAINT fk_productosproveedores_productos;
       public          postgres    false    216    3347    222            @           2606    33418 9   productos_proveedores fk_productosproveedores_proveedores    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos_proveedores
    ADD CONSTRAINT fk_productosproveedores_proveedores FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) NOT VALID;
 c   ALTER TABLE ONLY public.productos_proveedores DROP CONSTRAINT fk_productosproveedores_proveedores;
       public          postgres    false    222    3351    220            >           2606    33388 #   proveedores fk_proveedores_tiposiva    FK CONSTRAINT     �   ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT fk_proveedores_tiposiva FOREIGN KEY (id_tipo_iva) REFERENCES public.tipos_iva(id) NOT VALID;
 M   ALTER TABLE ONLY public.proveedores DROP CONSTRAINT fk_proveedores_tiposiva;
       public          postgres    false    220    218    3349            ;           2606    33329    usuarios fk_usuarios_roles    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuarios_roles FOREIGN KEY (id_rol) REFERENCES public.roles(id) NOT VALID;
 D   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT fk_usuarios_roles;
       public          postgres    false    210    212    3339                  x������ � �      
   c   x�31�440挮VJN�+�LILQ�R0�QP�L�/(�O)M.����(�(1�PbX�eb�ihh�dsZ6��\L5� ś暃�5��@�=... ɪ5O      �   ?  x���;n�@�k�)� �y�A�>HR��F���h(�À}�=�A���X��Ȼ^�1���ɏ?�}�|˳�}�hz�5$���|	�g[��͠a"��Yݭ��.�9fGѨI�9N0o2��=yCf�
��	�{��T0�r�b��Gx�y�@V���L9Z�WMڽn��L'��F/��_T̙����`��)9�tR��DN=G�h~���Dp����8�#�,9�IJ�Y����H�z=�Ϟ�I+R/�6�rp�L1Rjƍ��^AA8��9!�6�l�%{k�҄�`˟ԩkMb/%��n ����'�r���9���qS���c�'�6s�����Z���V�ŗNS���К1Si�Ac�c�qW)Fj��Tg��5�o��ݯ��L(����΅Jp`��ux����[K�5���倜������i��u�k�H�Qe��r��h�?C{	���������:R8�?/<�0N�Pt�G�=Y�`�������u�W��r||a�$�Sֽ�0)�a{g���zOn��~Zí�I��U �i�Z�8�_\k(Y��ǐ�r���,�Y�Ꮻ�n��2��      �      x������ � �      �   P   x�-�� !D�3C�-��2��1����'(�9�m7�4i���m�0 �O��5-��qN��ϧ@���X���g��m��      �   =   x��0�4B3c=N�NCKNC. �F(�\���,�,���,�b���� >�             x������ � �      �   4   x�3�ptwtq�,�2�s�s���9�B} �&�A�a����~@N� A��      �   @   x�3�p�s�wtvqt����,�2�������;�9�]��]@l� Wg�(/F��� H�      �   0   x�3�p�s�t�q�,�2�2�\�]��<cNgG?gW/F��� 
�      �   :   x�}ʱ� �X�ϟ$����A��m��g�Ȧ�iҍ$3fP�p�v�w_�7�         6   x�3�4202�50�52�44�36�4�24�
�ꂘ�za#���1Bu� ��      �   0   x�3��4202�50�5 2KNCcNCNcN#.CKdE����qqq ��      �      x������ � �      �      x��\]��ֵ}����Z\q�J��K�iro����6m�8"�HgL�
)[�p��S��(�֗ ��k�}IIc;ד�ia��5E��s���f<��_�G�Y�z��h:�_Eel����=���N��djnMn\�K���Rg�n�Ws[�$�����&�����N�ܮtf�Z������૩Vs��M�֦tE���2��u�p�t��šs�tZ(|��u��J�S�5Ξ�uY�LeV�[Jo�T����Y��k\HU;U̯Le78'�����U�3�Y�oQ��\�Ԛ��B�tz��j����qf\]�y�ΊR縰�^��>��[�䧽eU���;w H�Թ��yu�sީ��j~g8�?���N*wg8��l���`:>Ż��=����(+���_��ʊOs���W�Eo8<N��xܛ��^��N�I�/�,����Jr��Aŉ����uW�b���<�� mk��4R�%���U�[�%KC��'WU��2��d�*���҄�>wt
W{ab��&�ZN��:�^R�:[�S�;+S&dk]j�qї�>�ڕ�]�^;�-e?O�σ�!����Dc�7,�D��"�?����(Y��@��x-��]��eQ��`�������Q�����	}���F��kRJZ�$�����r�}S����:O`�E�1%T��Ԋ�v���?!(��&�~�v���N�V�N�ߛ©�����B��4`�$�]�����v �T�m`%�E/��]D��H|O/�)�Q��zn�r{�hQ41zM�N�^�r�q+�䡮 ����!j�r
N���� -�e���^S��"�]�k��n_:6ו.���jkRs���$%
_����XP@�Ow���zbRj�u:&���]���KpR�-𑆚��-�7�o��w�D�fC���%���/��Z�<h��ds3��lNAוMGC
�WQ#|3W��v�rN
���Ss
0��G�X���w���x@9�d��5d�8��,/�Ⱥ()�j�L���`��F�������̧�A�1x�7�@��J��e����Y0��1�(#c�⃘}�#�d��4>���&XU��r����ɛ7'A�/�yi�{�p�8��ɚ%�v��d8$x�]w�+��į�ŕ�<���S��86�^�����'�����}����%5�j� ۽�AC,/ 	R-?Oz�L��b8��ӭj:{�.wY����b�d�$ל!����R����|tڤ�U��_�O���GY��)�Xץy�W��/�)�"8�\��/꜡�*0q�� �3�%A��`����2��1�����,��+�5Eﵦ3벴s�D��a�$9����LU���x�X�M�M�K��Oj�5��Ju��%�
c��)�	�ycDP2�|����Fg8�ѕ.��/�(���I*9�l6L���x�y,���8� �����Y�����\�u�����It��e�"�@�����}e`
�{l6��s[��7j!��$9��I�3�JA׸B2�<���3|ЁI}Je0S�����8:~�� _J���$v�CN	�&���#Y��]-�<i6�gMR�^Q��ͳ�B��$"@�gт��DO���l]n2i�=��'�a|r&uηK�E�h�4����,㊐�q�r��'�����&��-�Xr@�Ɯ�C.�f�q���+�u���|6 �Bz_����|�yE����I�07�����+�K_����y��Z��b���Wu����jmPQ��7n��[�Ly��9��&{%�s�8��3���3;t$�a�3�n^�������w�(a��s5A*3��,!��Q^#���P<,� 2
��@ҕqR��Tt���#	EE��`+g�Wq�n�فt��1��U-|ؔ��|�),��i'�N���/�HQϹ����S�Wpn���0��W�U�Ks�8<�Ϲ����$8O������?#�u����F�-��cM�#HVE7�����l��g|�Pm��ۚ��l���Uow�A��;F��&��)F{�C��C��u��>��z��BNBY��n����bN�1�����1��v?0dR@01�~Q  g�M�e�)
��RE����+�x8���\.ɫ���G��9$j<�ӆ����1\j���!W��vZ���hrC@b�m���a�L�R�E���?���KC8�c]��������w�u�P5��;*�f0d�㸱�qǎ�k ��G��h�?1��m6Xڑ��,��Qc���F���&�ș}�ӟ�3qfKomo#�Fc��Î�Nz�������z^�O	��@�e�eZ�� �E�P��m�AX�ڹ�uS"feQPb�א����F���� c,�@*KZ!���&	���k�gT28�o������������Š���ڝ~�?@����{Vq��w#���������j�-HF��ENx�9���r�G�:�ƵΜ�������pr��?$����tSm�5H6dդJ*aw�l�k���;h����/E��w�1��~�ւq[�����p�cVp8�F;=���~�m��w5iכ���Q|M/w���#R�м�A���U�iO�3g�)�6��\�DhW�@CQ	?"��!�z����X��r�lb��Ev�����(��9�Z(j�EiR��e�����N�I�ȳ�:��Qf�5��g����\��R��kw����E�CRh�BSz��r��Զ,H
��m�V��Y<�{Ɋ}�A���{��z�,j\��"_(��,�D�19�bY�/J��}���R|�L�D�֖�eJ�/Hk��ǥo�)���T�F#�J܂L3�e%7��͇�g���On3�p���f� ft��k��=���Jo:>f�&��J�^��g�z��Ng?Mps�?�L��kx�����J=�bDKC��j�?��&A�q4�&�h�&����䒢}���m�úbz��RG^{R"�'�~H���&?a�����S���<�q��w|����o��'��#����At?�h���.�*�ș� ����j�i҃�����ʙ�Z�B7�VFM�ዐy�g���fI[����r�
��I��'p�;7y��:u��q����h��P	#��w����= ��.S�[7�-Cm�����1E������,{_��-
�fq�&!�(/QҊ�� ��j�FhT99�Ľ"IQ�����Y�d��ł��F����&y�Y���t��3�4ǝɄR	�e��CeD�ާ":��ݝ������5)ٻ��2M9p��n�o���MKKf�m����Ԑl�*kf���3�[#�yG�#BV	�0ʼ�?��L�=��_�1�)uU���"y�*��{N�q�A������W}��\�Z���9*or���k��+ʹt�p��aƻV�Kj4���<�Ϣ$���G����h<E�t(���PJ����;����V�_IJ@X�v��RzN�%R����y��~��k�O�u�3� D�n|��		ÿ�2/h�ZB�z�ʸ����muS<u���Zq�	����K��(�Ó��6�����6��x{BUڵ��5��"��Wx����#�2�y��Tҧ�>L7�x8�ςn� P���yyF��ވM��GVL|P�
���O�����{��cu�Z�z��dٓa�U�4�|/������J�g�s�b��*���Q9�?�+ԙ����xb�i�W\O^�`����5�@=9��U���"4�\�s/iE�|Q�W�p%����4���[M} ��Hd����8�Ԑa�,#���)����k8I���v�%>���a/�OƱ�҈w�{��N`�u&=nl6ߓ��S�*�%�")������AJi�3U�#�UC�L�ʸc����(O�����+R"��j�����NOJo� GP5����u�e�T�P�r��` a���~x���2�A�1�X�6ү�F�'��x@w�����bsk�c89k���Pw�u���㘾�����F�M�mQ>+�J�������k(�0��S �  �)^�U�%Q0�q����̠�G�'�
ƕ���f�iaW(Q,0���o�}mipL���i��%�O���-1i-�H���02cd⢾bmp{�C�y�o]h����v:�ΦӖ�
c�&z.��"t���}	3l���i�1B#lq�?y�p�Z=Tߔ<����E^�#��W.�Ls_�y	A�%E:�*E��p����pTm	�OTsQJ�?c	���j�T�k�'�z_�Ě�"��Ib�αY��]��x�_����PZ�p����P�4���D:���!+�F�_�'�p��r@:>;k����#*�4���*���`Dj8>�DO2̀��mH�k���dY��_	/�Ƴ��y/��Vo��9n4��
��q#�-��{�5��o)�Bj_q%�va)�s~d�@q�� q��-"��v���z�d�1�!��Nh$���as��;c��z Z85������r)*�N���Y��q�N��3M~6����k�
��c~	�����hj3�@�2�ggbID���h��	�B�|x���y�2�5��^썧o[�`�{Qdk�S�2���{�2.l�C�)}+2�a颖ƈ���%b0<5D��6���f�r�X'����׷m�� �M�,etSK<�i�*>;N/��˷6K�=Z���b��)f�����:�7��'�X��n�4�l S�k.6%UŇ�������� ��^^�+�'���K�ƻi���Ԑ����7�=����;���ŉwYs5&��Ӆ�1�/o�2d�,3D߲=zv~w�nZb|g��t���^�h*e(�y5M�p�@%剀=�9�K�����R�7
v�V|��9���lA�M;��ú{%����O��Ļ�~d���|x��,��#��V`�ܫ�**��N֗K�j�@��P&�@��ҌȄnn����׵���0��կwx�\~��S�aۦYeAv[�kf���`'����̿��>�n�Lh�UI�A���0�Xx�)�`���d��,�W�dSl�F�=n���/��/���۾�_n��{6���6�����[u�*U �3��'��?�F�X6��xO���EX4`ި�r�a�f\����u�1�6le3�5U�I%�� �wF�5PʤKg@�	�2��u���CUh��,��_E��KZ���p��ʾ*��� }�щaJ���J�����ML��9f�zi��ߒ�����������egjM�_���GS�/2VSC���A�`�Zp �Lf�ȥ�=A�}�Ug��A߬�m$�=>c�]W�*����C�Ѥ��~i��s�wr>}�	FY	t!�K��Ob���&�λ�'�d���h�����Vs��`�Չ	��=�����M��1���ui�fa�2� �89=�A�mN��(�d��?
���z �]���b��`ٝ�;�i�!E����Ap		�J��ȥ�Z]B�s\���g��uK������,�+���ea7��^,�<yy�GG��ӓɸ���s8k;��?Nb�sȻS��10�1W�5� �C�"4WV�U8-(��.\~<]�x�Y^�d�PMV�j�	�p��A�v�sC��,�B�FDII���`Ե�S�'�yö�N �����'=�-��t2i>*E�a�a%n:��$Hp��f�}9�%\��s_~I�}ƃ�t�-����o��ў9ʢ���2n��Y��+5����C��&��o^:��}?��8�l��J�!�O���C�rR:O�w�pL���*a-�����vX�GUk���Y�G��FW����2a�P�#8�������{v��'B��Ki��8�w� 0�W��u���@�8��%.�(y��!��˰f�L�=)1cC%�@��R����?]نGoL���	�n� �d!J�� u�-��,R�m���E~I!*�j�1=� J�f"J�ʻd�0�{�.�ƤҟW�U#�<.֦��7.&�;�9gV,�}��g3ľXo$a{���?<l����f+G�T�"B��o��J,�C�5����ٝ�{��`t$�.�3�#��2��Ӛ
k���j��p���}�� 5I�E����p��Ҽ�7��?��7�L��/G�ohd��z ���,s�։��E��\���¬Kg._?����W<�����Ҽ"���
� �(��F*����:�W9�|.�@K���/�i0�h� ��.9��/���sIvE�(�xt
��g�L具�L7�Sp~Dk�UO�ѵ|�aڝL��5��hQPcĔQ���R>�v
��z��dz���]ڏ�^��}��) 7�%�g��!a���F3�^�W3>���ޓ�wA�m��̉�����d��f-��11�6�4��u�e-#�:IU�!	E8v����I3T��<-�ym7�3m�.��T
	��eCj4�]�s�Ch0���{��s��^_!���>~���^�W">U�6T�"�:�/2�y]�k���J�A�V�kvM�M�z���_�۽B�
��fK/K����m1�`:����R�������7=��.(�,��zRj���#ٍ�Y����/����ݩ�d�>i�yuG�Ww��O�ǵŝ��}���?�	?ݸ�C�ǜf��D�x�9݋5~/�8�9�/?%�����9���J��,��oh,ҒƊ�}����[�a��y<�!DI��k}qc|co|�Q���IZ�\�L}�i��k��?z��o������]q[,��q�h/޲m��L��_Fx�ቝ��
���l�S�|Q8�PU�(<�P���2�koF}�8ߟ��臎���ΣC�" ��Y��U�/���Y2w>�����^�8�Ũ�Ɣ#h��L��]�eѼH��%����3N�B5eU&�Z�8���l���}��n��I����vN��+��t����e�X\ʖ��	4�(X�[�b��	�f̈́��e�Ȇ�T���z�D �C#/uߴ��)]����OJ}-O�zD�Uf˹W�+��fA�}"�g���f�#.͒��֠y�ՍF�ISx{:"q������{����ް=�k|2����~�S_��D�{SU����Ƌ���^<�w/WDɵ_��L_�g��T��2yt"S4!H	�D��ۛoV���I�F���Th6^q���r��-~�7�q�ڥ��V,��Y#
�,ܑ���p[8��r�;���,i��~\����'��2�{O`q�l[�����R�oCx��i�2<�m!m��E�u�B�=? z���%F�+�������.�:i�u� ���&yʦ���t�5i�>y�S�e�2o�*3�+s�d��5a�э�A+��(�që�'��G-
����-<��<��ǂ��L�pѫ�l�����f'��aj�sϤ�ɣ�����q�����tӦޝ�z�Ͱζ�<;􎺗����;�g��`������ɣFjC�j��i��N�nڡ�vc��ӓ���)_��      �   /   x�3�4360�30�L�4�4�2�47��|cNC#� ������ �V      �   �   x�e�[k�0����'�\��ۤ���A���POK 7��O��V��[B�����3>ȑ���5Nr��y�_nF*�_�Q2Q����b��t�0.����,��^�A;�D�q��L����	�;i����wG\ mw��I�6��ծ,8�Z+K�����$����௉A���X�6}��m��#��uPS��m�^��o�H�'�����)�;�3�u�d��gY�=�x      �   3   x�3�t��L�+I�,�2�(�/KMM�/�9Sr3�2�K�!"1z\\\ {��         �  x��X�r�8]S_�pwE~���V<���Ը�T���7W$DC	6@jZ�ͧx������?6�^�)ˏL&[A�s�=�'���ku�]�M�����$�KU9�r�"O��K��+K�봩��Դ��hB�X<�t���K���R�Ԥ�������$�yM����\�nM橦�������e�TSk>S�������I���`B���D���^�T�'D������ErQ�ҵw��S)eX�</����ъ�MF��'�[�A֤lx�JN��i��65�+ihmםg�;��W�/s�����5Y�jy,�LY4����I;��A�ӕ0���Ke�w�4ƈ'x;3��H�.���{RY�y^4�=�?O�Q��Q��'��{
� !��<b�wڲ7KEG�z�X �d��ό[Q$%ڛ�J>�Ⱦz��h��	c����yp>�-:���������cV�m�C���4y��ڬ� �t�e�RW�x_��W��(�V��>�($�"�y�Z�tv	��Bd{2�Ԝ�fc����m�ǆ_���h�KiF���u��C���>J.�c�+	����ܔ�~�~��w
�q��|�y�㎽�z����j�xftp��x��⫡�Ə��.����RTX�_R�>A��2���o�_Q:h�RI��@@p2��$�̮u%ޜA5���MY�2>L�CR�P�ߪ�b��>y��]�9����;�H�m�������Fj�1�e�t
	���cj�H��NSg�M5 ^|�99�
�~��RN7Ԣ����+8~��l�/��I9���ՖF	�r�I�gu��>���{WɃ�+*�+x��g�r�ej�zH��x���b�f�y�k��F�p�ol�-0_%<-�"�Kj��!A�Gsy�K�6�]��T8U������Tk�j�"�}^�ݔ;Y���pU�G�E���/T��O,��G��l�%�Q�������v��P�ᒋk 	�EZ9� ����(BqE�f�a,L+@�ľP���Y�R�lo���|�+*dَ��iY��B�5jE���c.��}�~�%��`���E���m�����!|t� 7(��Q��T��1�$��KO����Yϝ}
�g�,�1̝:;�3B �r#����Jg"�k��#�� _��A�&<���U?��
yձx:T�[g�̱h/�g�ޔ0���cT%�GT��I����3�Z�GU���Ƅ��>7�p�)ZÔ�8n�wR2�<����^���M=�#���n�X�u?�đ6?O�6�l�.���%)2�M_.3��qJ�E��� fί(��ɤ����`Cy���*TJS��M�U������Ur���$�.�X6:w��j+W�6�'3��0*7 "��������CW����5�M!�(���Mpn�
��G�u<|(��-�[1�9M�+��~p���1k������>��@�ژ'�O�#�7]GG�O4yL<O��մU�Ԕ��y{�aү]�W=�bX8=��^G�ɻ���ĩ��Kr��U��ӄ��'
Ĝ�������>Xb��i{���;@ؚ�
$#e�_6�Ա��N�𪛘db��+��aam���Vn
�Z<H�������z���
��@�`o��|u�8��߁lY�jn0�ű�p��Q�K�|�H�5���irm1��	w>�9���/(��v��J�b�<?�F�g���(�[w^Ku���G�'n�r�����G�f����o�~8����z.��C���/XX�`9��ұ��O��� �{:�I�I�~��t�C�۶z��&� -�M���/�h~;�5��(���03�!%B:�.x��'���>)Y����[\�!c�2�w5O3���؄V��Z���z�5-�4�o	��o�NΔSST������{�o�=Y��b���/y�SG0�;vHk�M�`�+0��x�W�Y��DT��9����x���Ǜ1˳"f��س3��Zc�tX/��tr|�\4��Y98.�����!ǫ��S�=v�)	^TM���Tp&�1V�+O�1+a�-��⃶헅+�aW��������K��"��W4A�f��y�p�>Mf�]��z��b^S���x���;����!��}�b���X~Dg���yIES#�g�21:�\ܢ[ֵ��-��'^���q8M�b�����o�_v���n���Hƣ���������c�o<�J:+W<��<�L��j�{      �   "   x�3���ON��,�2�t�(I-��/rb���� r]i      �   Q   x�3���J-.��+NL�IU��+N.�,(��,�2�������/)�L*-�,.I
s:s:U��f��)�e�%� �c���� ��M         B   x�3�tMKM.�,��,�2�)J�+NK-J�K�L�s��%'��$��T�p�e��1z\\\ }��      �   �  x��V�r�:}V��y��$_�
������td[��-S_ �o�}:��;�����p:Ö�h����K�� �hJK���'�L�}DE?���d[|ۓ,;&i �NA�$��0KC�{	a���R=��� ��� ��T�'$}�I���=��I���i("t)�S�#+*Pd���z�#sji�d�LX��#�P~��9��/XP�4� ���gIAt���`%[�
v<z�l�b2�ίk��0
�8̷`�ì��B�� .��@�.�rq�!40	�-�Q�I�07�]��
��#�LB/����Z�X:��at�492@�ث��IRsOB���
cT)���w���>�Ұ,��ޢ4�C��{'���&&aTC�"�J�,6�7'y�u�3�VT:�Y(���}ީ��<k�h�Ӄ+v&=����A�ЀF��!�@�8U�@l�C@�0�$��^����RK����<��[
��w<R{�igV�^y&���u�<����Å��F���_��u�PNV�9���#.�fyN�ͧs�󌡾xL�+�0�����q�;Viɶ݉�n*��T)�x�;ن��w�"��'��"�S��I���*�s�V�޹ð\���n�l�|���OYW����"狟�Ӳ�l���<�z�K4�c�����e�����C�CrJ��W�.I�����W�,��g\k^�)���VX���:pI��2��^o{�=���6j��s�X�e���!��1�����%�8�%��f��%�&,�7H���;zSsz4�I ����f��+m�3C�)�>}�)ש/9iP�$}k�1Ҏ���򪵲ĎiDn n�[Yu�~�'�ѼԔ�79�D��e����Z��U��4J@;:P����|�T��׽��iP*���X�xH��c�7�j��绂�����;����~m>��jwx���n���2�����~�iP�V�!C:���k�֭}j,��b�:�6-���i���x��=��{$�'��q5�_��/�D��;��R	TU}ު]��z�&8�8_�u�y}SN�W���%m[F9`���&D=�u�(�苫�����5�(�#bt�pFs�B�Q)eem��Uo ��素Mܭ���
͕M��x�<!��-+��>_�<��̋a�yg��q��N���i�p���
544�6F�7��ο�777���     
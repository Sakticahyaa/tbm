/*
  # Create buku table for Taman Baca Masyarakat

  1. New Tables
    - `buku`
      - `id` (uuid, primary key, auto-generated)
      - `judul_buku` (text, book title)
      - `penulis_buku` (varchar, author)
      - `aliran_buku` (varchar, book genre/stream)
      - `jenis_buku` (varchar, book type)
      - `lokasi_buku` (varchar, TBM location)
      - `sinopsis_buku` (text, book synopsis)
      - `penerbit_buku` (varchar, publisher)
      - `ilustrator_buku` (varchar, illustrator)
      - `isbn` (varchar, ISBN number)
      - `created_at` (timestamptz, creation timestamp)

  2. Security
    - Enable RLS on `buku` table
    - Add policy for public read access (since it's a public library catalog)

  3. Sample Data
    - Insert sample books for demonstration
*/

CREATE TABLE IF NOT EXISTS buku (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  judul_buku text NOT NULL,
  penulis_buku varchar(255) NOT NULL,
  aliran_buku varchar(100) NOT NULL,
  jenis_buku varchar(100) NOT NULL,
  lokasi_buku varchar(100) NOT NULL,
  sinopsis_buku text,
  penerbit_buku varchar(255),
  ilustrator_buku varchar(255),
  isbn varchar(50),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE buku ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read buku"
  ON buku
  FOR SELECT
  TO public
  USING (true);

-- Insert sample data
INSERT INTO buku (judul_buku, penulis_buku, aliran_buku, jenis_buku, lokasi_buku, sinopsis_buku, penerbit_buku, ilustrator_buku, isbn) VALUES
('Petualangan Adi dan Adam', 'Riki Pratama', 'Fiksi', 'Pelajaran', 'TBM Kantor Kelurahan', 'Sebuah cerita petualangan dua sahabat yang mengajarkan nilai-nilai persahabatan dan keberanian dalam menghadapi tantangan hidup.', 'Bugel Publishing', 'Rina Sari', '978-623-1234-01-2'),
('Lima Sekawan Kendaraan', 'Roihan Afifi', 'Fiksi', 'Novel', 'TBM Kantor Kelurahan', 'Kisah lima sahabat yang berpetualang dengan berbagai kendaraan unik dan mengalami berbagai kejadian menarik di sepanjang perjalanan.', 'Salatiga Press', 'Doni Kusuma', '978-623-1234-02-9'),
('Ollie Si Anjing Super', 'Aphrodity Jazzy', 'Non Fiksi', 'Non Fiksi', 'TBM RW 02', 'Cerita inspiratif tentang seekor anjing yang memiliki kemampuan luar biasa dan bagaimana dia membantu manusia di sekitarnya.', 'Pustaka Nusantara', 'Maria Santoso', '978-623-1234-03-6'),
('Dongeng Nusantara', 'Ahmad Fauzi', 'Fiksi', 'Dongeng', 'TBM RW 01', 'Kumpulan dongeng tradisional dari berbagai daerah di Indonesia yang dikemas dengan ilustrasi menarik untuk anak-anak.', 'Garuda Publishing', 'Siti Nurhaliza', '978-623-1234-04-3'),
('Panduan Berkebun untuk Pemula', 'Dr. Sari Indah', 'Non Fiksi', 'Panduan', 'TBM RW 03', 'Buku panduan lengkap untuk memulai berkebun di rumah dengan tips dan trik dari ahli pertanian.', 'Green Life Publisher', 'Bambang Sutrisno', '978-623-1234-05-0'),
('Matematika Asyik', 'Prof. Edi Susanto', 'Non Fiksi', 'Pelajaran', 'TBM RW 04', 'Buku pembelajaran matematika yang dikemas dengan cara yang menyenangkan dan mudah dipahami untuk siswa sekolah dasar.', 'Edukasi Prima', 'Lisa Maharani', '978-623-1234-06-7'),
('Cerita Rakyat Jawa Tengah', 'Mbah Suroso', 'Fiksi', 'Cerita Rakyat', 'TBM RW 05', 'Koleksi cerita rakyat khas Jawa Tengah yang sarat dengan nilai-nilai moral dan kearifan lokal.', 'Budaya Lokal Press', 'Arief Budiman', '978-623-1234-07-4'),
('Ensiklopedia Hewan Indonesia', 'Dr. Budi Hartono', 'Non Fiksi', 'Ensiklopedia', 'TBM RW 06', 'Panduan lengkap mengenal keanekaragaman fauna Indonesia dengan foto-foto berkualitas tinggi.', 'Natur Indonesia', 'Ratna Dewi', '978-623-1234-08-1'),
('Komik Superhero Lokal', 'Rizky Nugraha', 'Fiksi', 'Komik', 'TBM RW 07', 'Komik superhero dengan latar belakang budaya Indonesia yang mengajarkan nilai-nilai heroik kepada pembaca muda.', 'Comic Nation', 'Fajar Ramadhan', '978-623-1234-09-8'),
('Resep Masakan Tradisional', 'Nyonya Sumi', 'Non Fiksi', 'Resep', 'TBM Joglo Mutiara', 'Kumpulan resep masakan tradisional Indonesia yang telah diwariskan turun temurun dengan cita rasa autentik.', 'Kuliner Heritage', 'Indah Permata', '978-623-1234-10-4');
export default function Tablelist() {
    return(
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Judul Buku</th>
                    <th>Penulis</th>
                    <th>Aliran</th>
                    <th>Jenis</th>
                    <th>Lokasi</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                <tr className="hover:bg-base-300">
                    <th>Petualangan Adi dan Adam</th>
                    <td>Riki Pratama</td>
                    <td>Fiksi</td>
                    <td>Pelajaran</td>
                    <td>TBM Kantor Kelurahan</td>
                </tr>
                {/* row 2 */}
                <tr className="hover:bg-base-300">
                    <th>Lima Sekawan Kendaraan</th>
                    <td>Roihan Afifi</td>
                    <td>Fiksi</td>
                    <td>Novel</td>
                    <td>TBM RW 01</td>
                </tr>
                {/* row 3 */}
                <tr className="hover:bg-base-300">
                    <th>Ollie Si Anjing Super</th>
                    <td>Aphrodity Jazzy</td>
                    <td>Non Fiksi</td>
                    <td>Umum</td>
                    <td>TBM RW 02</td>
                </tr>
                </tbody>
            </table>
            </div>
    )
}
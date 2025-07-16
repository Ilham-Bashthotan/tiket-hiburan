// RBAC Middleware untuk membatasi akses berdasarkan peran user
function rbac(allowedRoles = []) {
	return (req, res, next) => {
		// Pastikan user sudah terautentikasi dan memiliki properti role
		if (!req.user || !req.user.role) {
			return res
				.status(401)
				.json({
					message:
						"Akses ditolak. User tidak terautentikasi atau tidak memiliki role.",
				});
		}
		// Cek apakah role user termasuk dalam allowedRoles
		if (!allowedRoles.includes(req.user.role)) {
			return res
				.status(403)
				.json({
					message:
						"Akses ditolak. Anda tidak memiliki izin untuk melakukan aksi ini.",
				});
		}
		next();
	};
}

module.exports = rbac;

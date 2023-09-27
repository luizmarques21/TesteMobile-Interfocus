/* eslint-disable no-bitwise */
import { Alert, Dimensions, PixelRatio } from 'react-native';
import VMasker from 'vanilla-masker';

export function dateFormat(format, timestamp) {
	// http://locutus.io/php/datetime/date/
	//  discuss at: http://locutus.io/php/date/
	// original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
	// original by: gettimeofday
	//    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
	// improved by: Kevin van Zonneveld (http://kvz.io)
	// improved by: MeEtc (http://yass.meetcweb.com)
	// improved by: Brad Touesnard
	// improved by: Tim Wiel
	// improved by: Bryan Elliott
	// improved by: David Randall
	// improved by: Theriault (https://github.com/Theriault)
	// improved by: Theriault (https://github.com/Theriault)
	// improved by: Brett Zamir (http://brett-zamir.me)
	// improved by: Theriault (https://github.com/Theriault)
	// improved by: Thomas Beaucourt (http://www.webapp.fr)
	// improved by: JT
	// improved by: Theriault (https://github.com/Theriault)
	// improved by: Rafał Kukawski (http://blog.kukawski.pl)
	// improved by: Theriault (https://github.com/Theriault)
	//    input by: Brett Zamir (http://brett-zamir.me)
	//    input by: majak
	//    input by: Alex
	//    input by: Martin
	//    input by: Alex Wilson
	//    input by: Haravikk
	// bugfixed by: Kevin van Zonneveld (http://kvz.io)
	// bugfixed by: majak
	// bugfixed by: Kevin van Zonneveld (http://kvz.io)
	// bugfixed by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: omid (http://locutus.io/php/380:380#comment_137122)
	// bugfixed by: Chris (http://www.devotis.nl/)
	//      note 1: Uses global: locutus to store the default timezone
	//      note 1: Although the function potentially allows timezone info
	//      note 1: (see notes), it currently does not set
	//      note 1: per a timezone specified by date_default_timezone_set(). Implementers might use
	//      note 1: $locutus.currentTimezoneOffset and
	//      note 1: $locutus.currentTimezoneDST set by that function
	//      note 1: in order to adjust the dates in this function
	//      note 1: (or our other date functions!) accordingly
	//   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)
	//   returns 1: '07:09:40 m is month'
	//   example 2: date('F j, Y, g:i a', 1062462400)
	//   returns 2: 'September 2, 2003, 12:26 am'
	//   example 3: date('Y W o', 1062462400)
	//   returns 3: '2003 36 2003'
	//   example 4: var $x = date('Y m d', (new Date()).getTime() / 1000)
	//   example 4: $x = $x + ''
	//   example 4: var $result = $x.length // 2009 01 09
	//   returns 4: 10
	//   example 5: date('W', 1104534000)
	//   returns 5: '52'
	//   example 6: date('B t', 1104534000)
	//   returns 6: '999 31'
	//   example 7: date('W U', 1293750000.82); // 2010-12-31
	//   returns 7: '52 1293750000'
	//   example 8: date('W', 1293836400); // 2011-01-01
	//   returns 8: '52'
	//   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
	//   returns 9: '52 2011-01-02'
	//        test: skip-1 skip-2 skip-5

	let jsdate;
	let f;
	// Keep this here (works, but for code commented-out below for file size reasons)
	// var tal= [];
	const txtWords = [
		'Sun',
		'Mon',
		'Tues',
		'Wednes',
		'Thurs',
		'Fri',
		'Satur',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	// trailing backslash -> (dropped)
	// a backslash followed by any character (including backslash) -> the character
	// empty string -> empty string
	const formatChr = /\\?(.?)/gi;
	const formatChrCb = function (t, s) {
		return f[t] ? f[t]() : s;
	};
	const _pad = function (n, c) {
		n = String(n);
		while (n.length < c) {
			n = `0${n}`;
		}
		return n;
	};
	f = {
		// Day
		d() {
			// Day of month w/leading 0; 01..31
			return _pad(f.j(), 2);
		},
		D() {
			// Shorthand day name; Mon...Sun
			return f.l().slice(0, 3);
		},
		j() {
			// Day of month; 1..31
			return jsdate.getDate();
		},
		l() {
			// Full day name; Monday...Sunday
			return `${txtWords[f.w()]}day`;
		},
		N() {
			// ISO-8601 day of week; 1[Mon]..7[Sun]
			return f.w() || 7;
		},
		S() {
			// Ordinal suffix for day of month; st, nd, rd, th
			const j = f.j();
			let i = j % 10;
			if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
				i = 0;
			}
			return ['st', 'nd', 'rd'][i - 1] || 'th';
		},
		w() {
			// Day of week; 0[Sun]..6[Sat]
			return jsdate.getDay();
		},
		z() {
			// Day of year; 0..365
			const a = new Date(f.Y(), f.n() - 1, f.j());
			const b = new Date(f.Y(), 0, 1);
			return Math.round((a - b) / 864e5);
		},

		// Week
		W() {
			// ISO-8601 week number
			const a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
			const b = new Date(a.getFullYear(), 0, 4);
			return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
		},

		// Month
		F() {
			// Full month name; January...December
			return txtWords[6 + f.n()];
		},
		m() {
			// Month w/leading 0; 01...12
			return _pad(f.n(), 2);
		},
		M() {
			// Shorthand month name; Jan...Dec
			return f.F().slice(0, 3);
		},
		n() {
			// Month; 1...12
			return jsdate.getMonth() + 1;
		},
		t() {
			// Days in month; 28...31
			return new Date(f.Y(), f.n(), 0).getDate();
		},

		// Year
		L() {
			// Is leap year?; 0 or 1
			const j = f.Y();
			return ((j % 4 === 0) & (j % 100 !== 0)) | (j % 400 === 0);
		},
		o() {
			// ISO-8601 year
			const n = f.n();
			const W = f.W();
			const Y = f.Y();
			return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
		},
		Y() {
			// Full year; e.g. 1980...2010
			return jsdate.getFullYear();
		},
		y() {
			// Last two digits of year; 00...99
			return f.Y().toString().slice(-2);
		},

		// Time
		a() {
			// am or pm
			return jsdate.getHours() > 11 ? 'pm' : 'am';
		},
		A() {
			// AM or PM
			return f.a().toUpperCase();
		},
		B() {
			// Swatch Internet time; 000..999
			const H = jsdate.getUTCHours() * 36e2;
			// Hours
			const i = jsdate.getUTCMinutes() * 60;
			// Minutes
			// Seconds
			const s = jsdate.getUTCSeconds();
			return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
		},
		g() {
			// 12-Hours; 1..12
			return f.G() % 12 || 12;
		},
		G() {
			// 24-Hours; 0..23
			return jsdate.getHours();
		},
		h() {
			// 12-Hours w/leading 0; 01..12
			return _pad(f.g(), 2);
		},
		H() {
			// 24-Hours w/leading 0; 00..23
			return _pad(f.G(), 2);
		},
		i() {
			// Minutes w/leading 0; 00..59
			return _pad(jsdate.getMinutes(), 2);
		},
		s() {
			// Seconds w/leading 0; 00..59
			return _pad(jsdate.getSeconds(), 2);
		},
		u() {
			// Microseconds; 000000-999000
			return _pad(jsdate.getMilliseconds() * 1000, 6);
		},

		// Timezone
		e() {
			// Timezone identifier; e.g. Atlantic/Azores, ...
			// The following works, but requires inclusion of the very large
			// timezone_abbreviations_list() function.
			/*              return that.date_default_timezone_get();
			 */
			const msg =
				'Not supported (see source code of date() for timezone on how to add support)';
			throw new Error(msg);
		},
		I() {
			// DST observed?; 0 or 1
			// Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
			// If they are not equal, then DST is observed.
			const a = new Date(f.Y(), 0);
			// Jan 1
			const c = Date.UTC(f.Y(), 0);
			// Jan 1 UTC
			const b = new Date(f.Y(), 6);
			// Jul 1
			// Jul 1 UTC
			const d = Date.UTC(f.Y(), 6);
			return a - c !== b - d ? 1 : 0;
		},
		O() {
			// Difference to GMT in hour format; e.g. +0200
			const tzo = jsdate.getTimezoneOffset();
			const a = Math.abs(tzo);
			return (
				(tzo > 0 ? '-' : '+') +
				_pad(Math.floor(a / 60) * 100 + (a % 60), 4)
			);
		},
		P() {
			// Difference to GMT w/colon; e.g. +02:00
			const O = f.O();
			return `${O.substr(0, 3)}:${O.substr(3, 2)}`;
		},
		T() {
			// The following works, but requires inclusion of the very
			// large timezone_abbreviations_list() function.
			/*              var abbr, i, os, _default;
			if (!tal.length) {
			  tal = that.timezone_abbreviations_list();
			}
			if ($locutus && $locutus.default_timezone) {
			  _default = $locutus.default_timezone;
			  for (abbr in tal) {
				for (i = 0; i < tal[abbr].length; i++) {
				  if (tal[abbr][i].timezone_id === _default) {
					return abbr.toUpperCase();
				  }
				}
			  }
			}
			for (abbr in tal) {
			  for (i = 0; i < tal[abbr].length; i++) {
				os = -jsdate.getTimezoneOffset() * 60;
				if (tal[abbr][i].offset === os) {
				  return abbr.toUpperCase();
				}
			  }
			}
			*/
			return 'UTC';
		},
		Z() {
			// Timezone offset in seconds (-43200...50400)
			return -jsdate.getTimezoneOffset() * 60;
		},

		// Full Date/Time
		c() {
			// ISO-8601 date.
			return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
		},
		r() {
			// RFC 2822
			return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
		},
		U() {
			// Seconds since UNIX epoch
			return (jsdate / 1000) | 0;
		},
	};

	const _date = function (format, timestamp) {
		jsdate =
			timestamp === undefined
				? new Date() // Not provided
				: timestamp instanceof Date
				? new Date(timestamp) // JS Date()
				: new Date(timestamp * 1000); // UNIX timestamp (auto-convert to int)
		return format.replace(formatChr, formatChrCb);
	};

	return _date(format, timestamp);
}
const { width, height } = Dimensions.get('window');

// https://blog.solutotlv.com/size-matters/ Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
	size + (scale(size) - size) * factor;
const relativeScale = size => PixelRatio.getPixelSizeForLayoutSize(size);

export { scale, verticalScale, moderateScale, relativeScale };

export function dateFromString(string) {
	const splitDate = string.split(' ');
	const stringData = splitDate[0].split('-');
	stringData[1] -= 1;
	const stringHora = splitDate.length > 1 ? splitDate[1].split(':') : [];
	const arrayData = [...stringData, ...stringHora];
	const date = new Date(...arrayData);
	return date;
}

export function isImagem(tipo) {
	return tipo.match(/(jpg|png|jpeg|gif)$/gi);
}

export function arquivoDoTipo(tipo, arquivo) {
	const padrao = `${tipo}$`;
	const rgx = new RegExp(padrao, 'g');
	return arquivo.match(rgx);
}

export function dateBr(date) {
	return date.split('-').reverse().join('/');
}

export function dateEn(date) {
	return date.split('/').reverse().join('-');
}

export function elevationShadowStyle(elevation) {
	return {
		elevation,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * elevation },
		shadowOpacity: 0.8,
		shadowRadius: 0.8 * elevation,
	};
}

/**
 * @returns string
 * @param {string} string
 */
export function extensaoArquivo(string) {
	const regexExtensao = /(?:\.([^.]+))?$/;
	const resultado = regexExtensao.exec(string);
	if (resultado[1].indexOf('?') > -1) {
		return resultado[1].slice(0, resultado[1].indexOf('?'));
	}
	return resultado[1];
}

export function converterParaDate(datetime) {
	const t = datetime.split(/[- :]/);
	return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
}

export function getValorCombo(combo, id) {
	return combo.find(item => item.key == id);
}

export function maskCpf(cpf) {
	return VMasker.toPattern(cpf, '999.999.999-99');
}

// https://gist.github.com/jmaciasportela/10250863
export function getTipoMimePorExtensao(extensao) {
	extensao = extensao.toLowerCase();

	if (extensao[0] !== '.') extensao = `.${extensao}`;

	const mimes = {
		'.3dm': 'x-world/x-3dmf',
		'.3dmf': 'x-world/x-3dmf',
		'.a': 'application/octet-stream',
		'.aab': 'application/x-authorware-bin',
		'.aam': 'application/x-authorware-map',
		'.aas': 'application/x-authorware-seg',
		'.abc': 'text/vnd.abc',
		'.acgi': 'text/html',
		'.afl': 'video/animaflex',
		'.ai': 'application/postscript',
		'.aif': 'audio/aiff',
		'.aifc': 'audio/aiff',
		'.aiff': 'audio/aiff',
		'.aim': 'application/x-aim',
		'.aip': 'text/x-audiosoft-intra',
		'.ani': 'application/x-navi-animation',
		'.aos': 'application/x-nokia-9000-communicator-add-on-software',
		'.aps': 'application/mime',
		'.arc': 'application/octet-stream',
		'.arj': 'application/octet-stream',
		'.art': 'image/x-jg',
		'.asf': 'video/x-ms-asf',
		'.asm': 'text/x-asm',
		'.asp': 'text/asp',
		'.asx': 'video/x-ms-asf',
		'.au': 'audio/basic',
		'.avi': 'video/avi',
		'.avs': 'video/avs-video',
		'.bcpio': 'application/x-bcpio',
		'.bin': 'application/octet-stream',
		'.bm': 'image/bmp',
		'.bmp': 'image/bmp',
		'.boo': 'application/book',
		'.book': 'application/book',
		'.boz': 'application/x-bzip2',
		'.bsh': 'application/x-bsh',
		'.bz': 'application/x-bzip',
		'.bz2': 'application/x-bzip2',
		'.c': 'text/plain',
		'.c++': 'text/plain',
		'.cat': 'application/vnd.ms-pki.seccat',
		'.cc': 'text/plain',
		'.ccad': 'application/clariscad',
		'.cco': 'application/x-cocoa',
		'.cdf': 'application/cdf',
		'.cer': 'application/x-x509-ca-cert',
		'.cha': 'application/x-chat',
		'.chat': 'application/x-chat',
		'.class': 'application/java',
		'.com': 'application/octet-stream',
		'.conf': 'text/plain',
		'.cpio': 'application/x-cpio',
		'.cpp': 'text/x-c',
		'.cpt': 'application/x-cpt',
		'.crt': 'application/x-x509-ca-cert',
		'.csh': 'text/x-script.csh',
		'.css': 'text/css',
		'.cxx': 'text/plain',
		'.dcr': 'application/x-director',
		'.deepv': 'application/x-deepv',
		'.def': 'text/plain',
		'.der': 'application/x-x509-ca-cert',
		'.dif': 'video/x-dv',
		'.dir': 'application/x-director',
		'.dl': 'video/dl',
		'.doc': 'application/msword',
		'.dot': 'application/msword',
		'.dp': 'application/commonground',
		'.drw': 'application/drafting',
		'.dump': 'application/octet-stream',
		'.dv': 'video/x-dv',
		'.dvi': 'application/x-dvi',
		'.dwf': 'model/vnd.dwf',
		'.dwg': 'image/x-dwg',
		'.dxf': 'image/x-dwg',
		'.el': 'text/x-script.elisp',
		'.elc': 'application/x-elc',
		'.env': 'application/x-envoy',
		'.eps': 'application/postscript',
		'.es': 'application/x-esrehber',
		'.etx': 'text/x-setext',
		'.evy': 'application/envoy',
		'.exe': 'application/octet-stream',
		'.f': 'text/plain',
		'.f77': 'text/x-fortran',
		'.f90': 'text/plain',
		'.fdf': 'application/vnd.fdf',
		'.fif': 'image/fif',
		'.flo': 'image/florian',
		'.flx': 'text/vnd.fmi.flexstor',
		'.fmf': 'video/x-atomic3d-feature',
		'.for': 'text/plain',
		'.frl': 'application/freeloader',
		'.funk': 'audio/make',
		'.g': 'text/plain',
		'.g3': 'image/g3fax',
		'.gif': 'image/gif',
		'.gl': 'video/gl',
		'.gsd': 'audio/x-gsm',
		'.gsm': 'audio/x-gsm',
		'.gsp': 'application/x-gsp',
		'.gss': 'application/x-gss',
		'.gtar': 'application/x-gtar',
		'.gz': 'application/x-gzip',
		'.gzip': 'multipart/x-gzip',
		'.h': 'text/plain',
		'.hdf': 'application/x-hdf',
		'.help': 'application/x-helpfile',
		'.hgl': 'application/vnd.hp-hpgl',
		'.hh': 'text/plain',
		'.hlp': 'application/hlp',
		'.hpg': 'application/vnd.hp-hpgl',
		'.hpgl': 'application/vnd.hp-hpgl',
		'.hqx': 'application/binhex',
		'.hta': 'application/hta',
		'.htc': 'text/x-component',
		'.htm': 'text/html',
		'.html': 'text/html',
		'.htmls': 'text/html',
		'.htt': 'text/webviewhtml',
		'.htx': 'text/html',
		'.ice': 'x-conference/x-cooltalk',
		'.ico': 'image/x-icon',
		'.idc': 'text/plain',
		'.ief': 'image/ief',
		'.iefs': 'image/ief',
		'.iges': 'application/iges',
		'.igs': 'application/iges',
		'.ima': 'application/x-ima',
		'.imap': 'application/x-httpd-imap',
		'.inf': 'application/inf',
		'.ins': 'application/x-internett-signup',
		'.ip': 'application/x-ip2',
		'.isu': 'video/x-isvideo',
		'.it': 'audio/it',
		'.iv': 'application/x-inventor',
		'.ivr': 'i-world/i-vrml',
		'.ivy': 'application/x-livescreen',
		'.jam': 'audio/x-jam',
		'.jav': 'text/plain',
		'.java': 'text/plain',
		'.jcm': 'application/x-java-commerce',
		'.jfif': 'image/jpeg',
		'.jfif-tb': 'image/jpeg',
		'.jpe': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.jpg': 'image/jpeg',
		'.jps': 'image/x-jps',
		'.js': 'application/javascript',
		'.jut': 'image/jutvision',
		'.kar': 'audio/midi',
		'.ksh': 'text/x-script.ksh',
		'.la': 'audio/nspaudio',
		'.lam': 'audio/x-liveaudio',
		'.latex': 'application/x-latex',
		'.lha': 'application/octet-stream',
		'.lhx': 'application/octet-stream',
		'.list': 'text/plain',
		'.lma': 'audio/nspaudio',
		'.log': 'text/plain',
		'.lsp': 'application/x-lisp',
		'.lst': 'text/plain',
		'.lsx': 'text/x-la-asf',
		'.ltx': 'application/x-latex',
		'.lzh': 'application/octet-stream',
		'.lzx': 'application/octet-stream',
		'.m': 'text/plain',
		'.m1v': 'video/mpeg',
		'.m2a': 'audio/mpeg',
		'.m2v': 'video/mpeg',
		'.m3u': 'audio/x-mpequrl',
		'.man': 'application/x-troff-man',
		'.map': 'application/x-navimap',
		'.mar': 'text/plain',
		'.mbd': 'application/mbedlet',
		'.mc$': 'application/x-magic-cap-package-1.0',
		'.mcd': 'application/mcad',
		'.mcf': 'text/mcf',
		'.mcp': 'application/netmc',
		'.me': 'application/x-troff-me',
		'.mht': 'message/rfc822',
		'.mhtml': 'message/rfc822',
		'.mid': 'audio/midi',
		'.midi': 'audio/midi',
		'.mif': 'application/x-mif',
		'.mime': 'www/mime',
		'.mjf': 'audio/x-vnd.audioexplosion.mjuicemediafile',
		'.mjpg': 'video/x-motion-jpeg',
		'.mm': 'application/base64',
		'.mme': 'application/base64',
		'.mod': 'audio/mod',
		'.moov': 'video/quicktime',
		'.mov': 'video/quicktime',
		'.movie': 'video/x-sgi-movie',
		'.mp2': 'audio/mpeg',
		'.mp3': 'audio/mpeg3',
		'.mpa': 'audio/mpeg',
		'.mpc': 'application/x-project',
		'.mpe': 'video/mpeg',
		'.mpeg': 'video/mpeg',
		'.mpg': 'video/mpeg',
		'.mpga': 'audio/mpeg',
		'.mpp': 'application/vnd.ms-project',
		'.mpt': 'application/x-project',
		'.mpv': 'application/x-project',
		'.mpx': 'application/x-project',
		'.mrc': 'application/marc',
		'.ms': 'application/x-troff-ms',
		'.mv': 'video/x-sgi-movie',
		'.my': 'audio/make',
		'.mzz': 'application/x-vnd.audioexplosion.mzz',
		'.nap': 'image/naplps',
		'.naplps': 'image/naplps',
		'.nc': 'application/x-netcdf',
		'.ncm': 'application/vnd.nokia.configuration-message',
		'.nif': 'image/x-niff',
		'.niff': 'image/x-niff',
		'.nix': 'application/x-mix-transfer',
		'.nsc': 'application/x-conference',
		'.nvd': 'application/x-navidoc',
		'.o': 'application/octet-stream',
		'.oda': 'application/oda',
		'.omc': 'application/x-omc',
		'.omcd': 'application/x-omcdatamaker',
		'.omcr': 'application/x-omcregerator',
		'.p': 'text/x-pascal',
		'.p10': 'application/pkcs10',
		'.p12': 'application/pkcs-12',
		'.p7a': 'application/x-pkcs7-signature',
		'.p7c': 'application/pkcs7-mime',
		'.p7m': 'application/pkcs7-mime',
		'.p7r': 'application/x-pkcs7-certreqresp',
		'.p7s': 'application/pkcs7-signature',
		'.part': 'application/pro_eng',
		'.pas': 'text/pascal',
		'.pbm': 'image/x-portable-bitmap',
		'.pcl': 'application/vnd.hp-pcl',
		'.pct': 'image/x-pict',
		'.pcx': 'image/x-pcx',
		'.pdb': 'chemical/x-pdb',
		'.pdf': 'application/pdf',
		'.pfunk': 'audio/make',
		'.pgm': 'image/x-portable-graymap',
		'.pic': 'image/pict',
		'.pict': 'image/pict',
		'.pkg': 'application/x-newton-compatible-pkg',
		'.pko': 'application/vnd.ms-pki.pko',
		'.pl': 'text/plain',
		'.plx': 'application/x-pixclscript',
		'.pm': 'text/x-script.perl-module',
		'.pm4': 'application/x-pagemaker',
		'.pm5': 'application/x-pagemaker',
		'.png': 'image/png',
		'.pnm': 'image/x-portable-anymap',
		'.pot': 'application/vnd.ms-powerpoint',
		'.pov': 'model/x-pov',
		'.ppa': 'application/vnd.ms-powerpoint',
		'.ppm': 'image/x-portable-pixmap',
		'.pps': 'application/vnd.ms-powerpoint',
		'.ppt': 'application/vnd.ms-powerpoint',
		'.ppz': 'application/mspowerpoint',
		'.pre': 'application/x-freelance',
		'.prt': 'application/pro_eng',
		'.ps': 'application/postscript',
		'.psd': 'application/octet-stream',
		'.pvu': 'paleovu/x-pv',
		'.pwz': 'application/vnd.ms-powerpoint',
		'.py': 'text/x-script.phyton',
		'.pyc': 'applicaiton/x-bytecode.python',
		'.qcp': 'audio/vnd.qcelp',
		'.qd3': 'x-world/x-3dmf',
		'.qd3d': 'x-world/x-3dmf',
		'.qif': 'image/x-quicktime',
		'.qt': 'video/quicktime',
		'.qtc': 'video/x-qtc',
		'.qti': 'image/x-quicktime',
		'.qtif': 'image/x-quicktime',
		'.ra': 'audio/x-realaudio',
		'.ram': 'audio/x-pn-realaudio',
		'.ras': 'application/x-cmu-raster',
		'.rast': 'image/cmu-raster',
		'.rexx': 'text/x-script.rexx',
		'.rf': 'image/vnd.rn-realflash',
		'.rgb': 'image/x-rgb',
		'.rm': 'application/vnd.rn-realmedia',
		'.rmi': 'audio/mid',
		'.rmm': 'audio/x-pn-realaudio',
		'.rmp': 'audio/x-pn-realaudio',
		'.rng': 'application/vnd.nokia.ringing-tone',
		'.rnx': 'application/vnd.rn-realplayer',
		'.roff': 'application/x-troff',
		'.rp': 'image/vnd.rn-realpix',
		'.rpm': 'audio/x-pn-realaudio-plugin',
		'.rt': 'text/vnd.rn-realtext',
		'.rtf': 'text/richtext',
		'.rtx': 'text/richtext',
		'.rv': 'video/vnd.rn-realvideo',
		'.s': 'text/x-asm',
		'.s3m': 'audio/s3m',
		'.saveme': 'application/octet-stream',
		'.sbk': 'application/x-tbook',
		'.scm': 'text/x-script.guile',
		'.sdml': 'text/plain',
		'.sdp': 'application/sdp',
		'.sdr': 'application/sounder',
		'.sea': 'application/sea',
		'.set': 'application/set',
		'.sgm': 'text/sgml',
		'.sgml': 'text/sgml',
		'.sh': 'text/x-script.sh',
		'.shar': 'application/x-bsh',
		'.shtml': 'text/html',
		'.sid': 'audio/x-psid',
		'.sit': 'application/x-sit',
		'.skd': 'application/x-koan',
		'.skm': 'application/x-koan',
		'.skp': 'application/x-koan',
		'.skt': 'application/x-koan',
		'.sl': 'application/x-seelogo',
		'.smi': 'application/smil',
		'.smil': 'application/smil',
		'.snd': 'audio/basic',
		'.sol': 'application/solids',
		'.spc': 'application/x-pkcs7-certificates',
		'.spl': 'application/futuresplash',
		'.spr': 'application/x-sprite',
		'.sprite': 'application/x-sprite',
		'.src': 'application/x-wais-source',
		'.ssi': 'text/x-server-parsed-html',
		'.ssm': 'application/streamingmedia',
		'.sst': 'application/vnd.ms-pki.certstore',
		'.step': 'application/step',
		'.stl': 'application/vnd.ms-pki.stl',
		'.stp': 'application/step',
		'.sv4cpio': 'application/x-sv4cpio',
		'.sv4crc': 'application/x-sv4crc',
		'.svf': 'image/vnd.dwg',
		'.svr': 'application/x-world',
		'.swf': 'application/x-shockwave-flash',
		'.t': 'application/x-troff',
		'.talk': 'text/x-speech',
		'.tar': 'application/x-tar',
		'.tbk': 'application/toolbook',
		'.tcl': 'application/x-tcl',
		'.tcsh': 'text/x-script.tcsh',
		'.tex': 'application/x-tex',
		'.texi': 'application/x-texinfo',
		'.texinfo': 'application/x-texinfo',
		'.text': 'text/plain',
		'.tgz': 'application/x-compressed',
		'.tif': 'image/tiff',
		'.tiff': 'image/tiff',
		'.tr': 'application/x-troff',
		'.tsi': 'audio/tsp-audio',
		'.tsp': 'audio/tsplayer',
		'.tsv': 'text/tab-separated-values',
		'.turbot': 'image/florian',
		'.txt': 'text/plain',
		'.uil': 'text/x-uil',
		'.uni': 'text/uri-list',
		'.unis': 'text/uri-list',
		'.unv': 'application/i-deas',
		'.uri': 'text/uri-list',
		'.uris': 'text/uri-list',
		'.ustar': 'multipart/x-ustar',
		'.uu': 'application/octet-stream',
		'.uue': 'text/x-uuencode',
		'.vcd': 'application/x-cdlink',
		'.vcs': 'text/x-vcalendar',
		'.vda': 'application/vda',
		'.vdo': 'video/vdo',
		'.vew': 'application/groupwise',
		'.viv': 'video/vnd.vivo',
		'.vivo': 'video/vnd.vivo',
		'.vmd': 'application/vocaltec-media-desc',
		'.vmf': 'application/vocaltec-media-file',
		'.voc': 'audio/voc',
		'.vos': 'video/vosaic',
		'.vox': 'audio/voxware',
		'.vqe': 'audio/x-twinvq-plugin',
		'.vqf': 'audio/x-twinvq',
		'.vql': 'audio/x-twinvq-plugin',
		'.vrml': 'model/vrml',
		'.vrt': 'x-world/x-vrt',
		'.vsd': 'application/x-visio',
		'.vst': 'application/x-visio',
		'.vsw': 'application/x-visio',
		'.w60': 'application/wordperfect6.0',
		'.w61': 'application/wordperfect6.1',
		'.w6w': 'application/msword',
		'.wav': 'audio/wav',
		'.wb1': 'application/x-qpro',
		'.wbmp': 'image/vnd.wap.wbmp',
		'.web': 'application/vnd.xara',
		'.wiz': 'application/msword',
		'.wk1': 'application/x-123',
		'.wmf': 'windows/metafile',
		'.wml': 'text/vnd.wap.wml',
		'.wmlc': 'application/vnd.wap.wmlc',
		'.wmls': 'text/vnd.wap.wmlscript',
		'.wmlsc': 'application/vnd.wap.wmlscriptc',
		'.word': 'application/msword',
		'.wp': 'application/wordperfect',
		'.wp5': 'application/wordperfect',
		'.wp6': 'application/wordperfect',
		'.wpd': 'application/wordperfect',
		'.wq1': 'application/x-lotus',
		'.wri': 'application/mswrite',
		'.wrl': 'model/vrml',
		'.wrz': 'model/vrml',
		'.wsc': 'text/scriplet',
		'.wsrc': 'application/x-wais-source',
		'.wtk': 'application/x-wintalk',
		'.xbm': 'image/xbm',
		'.xdr': 'video/x-amt-demorun',
		'.xgz': 'xgl/drawing',
		'.xif': 'image/vnd.xiff',
		'.xl': 'application/excel',
		'.xla': 'application/excel',
		'.xlb': 'application/vnd.ms-excel',
		'.xlc': 'application/vnd.ms-excel',
		'.xld': 'application/excel',
		'.xlk': 'application/excel',
		'.xll': 'application/excel',
		'.xlm': 'application/vnd.ms-excel',
		'.xls': 'application/vnd.ms-excel',
		'.xlt': 'application/excel',
		'.xlv': 'application/excel',
		'.xlw': 'application/vnd.ms-excel',
		'.xm': 'audio/xm',
		'.xml': 'text/xml',
		'.xmz': 'xgl/movie',
		'.xpix': 'application/x-vnd.ls-xpix',
		'.xpm': 'image/xpm',
		'.x-p': 'image/png',
		'.xsr': 'video/x-amt-showrun',
		'.xwd': 'image/x-xwd',
		'.xyz': 'chemical/x-pdb',
		'.z': 'application/x-compress',
		'.zip': 'application/zip',
		'.zoo': 'application/octet-stream',
		'.zsh': 'text/x-script.zsh',
	};

	return mimes[extensao] || 'application/octet-stream';
}

export const confirmar = (titulo, texto, onConfirm, onCancel) => {
	Alert.alert(
		titulo,
		texto,
		[
			{
				onPress: onConfirm,
				style: 'default',
				text: 'Sim',
			},
			{
				onPress: onCancel,
				style: 'cancel',
				text: 'Não',
			},
		],
		{
			cancelable: true,
		},
	);
};

export function navegarPara(tela, dados = {}) {
	const { navigation } = this.props;
	navigation.navigate(tela, dados);
}

export function getDadosAvatarForum(nome) {
	const letra = nome.trim().substr(0, 1);
	const bgLetra = toColor(nome);
	const corLetra = getCorrectTextColor(bgLetra);
	return [letra, corLetra, bgLetra];
}

export function toColor(str) {
	const colors = [
		'#e51c23',
		'#e91e63',
		'#9c27b0',
		'#673ab7',
		'#3f51b5',
		'#5677fc',
		'#03a9f4',
		'#00bcd4',
		'#009688',
		'#259b24',
		'#8bc34a',
		'#afb42b',
		'#ff9800',
		'#ff5722',
		'#795548',
		'#607d8b',
	];

	let hash = 0;
	if (str.length === 0) return hash;
	for (let i = 0; i < str.length; i += 1) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
		hash &= hash;
	}
	hash = ((hash % colors.length) + colors.length) % colors.length;
	return colors[hash];
}

export function getCorrectTextColor(hex) {
	/*
https://codepen.io/davidhalford/pen/ywEva
From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast

Color brightness is determined by the following formula:
((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

I know this could be more compact, but I think this is easier to read/explain.

*/

	const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

	function cutHex(h) {
		return h.charAt(0) == '#' ? h.substring(1, 7) : h;
	}
	function hexToR(h) {
		return parseInt(cutHex(h).substring(0, 2), 16);
	}
	function hexToG(h) {
		return parseInt(cutHex(h).substring(2, 4), 16);
	}
	function hexToB(h) {
		return parseInt(cutHex(h).substring(4, 6), 16);
	}

	const hRed = hexToR(hex);
	const hGreen = hexToG(hex);
	const hBlue = hexToB(hex);

	const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
	return cBrightness > threshold ? '#000000' : '#ffffff';
}

export function clonarArrayObjetos(arr) {
	return arr.map(item => ({ ...item }));
}

export const toReal = n =>
	`R$ ${Number.parseFloat(n).toFixed(2)}`.replace('.', ',');

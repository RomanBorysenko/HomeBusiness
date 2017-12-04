export function dataSending(data) {
    let details = data;
    let detailsFormat = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        detailsFormat.push(encodedKey + '=' + encodedValue);
    }
    return detailsFormat.join('&');
}

export function getAge(date) {
    const birthday = new Date(date);
    const today = new Date();
    const years = today.getFullYear() - birthday.getFullYear();

    if (years >= 1) {
        if (years >= 5) {
            return `${years} лет`;
        } else if (years === 1) {
            return `${years} год`;
        }
        return `${years} года`;

    }

    if (years < 0) {
        return '';
    }

    if (years === 0) {
        let month = today.getMonth() - birthday.getMonth();

        if (month > 0) {
            if (month >= 5) {
                return `${month} месяцев`;
            } else if (month === 1) {
                return `${month} месяц`;
            }
            return `${month} месяца`;

        }
        let day = today.getDate() - birthday.getDate();
        if (day >= 5) {
            return `${day} дней`;
        } else if (day === 1) {
            return `${day} день`;
        }
        return `${day} дня`;


    }
    return '';
}

export function createStringOfChildren(value) {
    if (value.length) {
        let result = '';
        value.forEach((item)=>{
            if(!item.isDeleted) {
                result = result + (item.gender === 'MALE' ? 'Cын ' : 'Дочь ');
                result = result + item.name + ' (' + getAge(item.birthDate) + ')' + '; ';
            }
        });
        return result;
    }
    return '';

}

export function getMaritalStatus(value, gender) {
    let status = value;

    if (gender && status) {
        if (gender === 'MALE') {
            if (status === 'SINGLE') {
                return 'single_male';
            }
            return 'maried_male';

        }
        if (status === 'SINGLE') {
            return 'single_female';
        }
        return 'maried_female';


    }
    return null;
}

export function setProfileData() {
    const value = arguments[0];
    const result = {
        id: value.id,
        fio: value.fio,
        email: value.email,
        gender: value.gender,
        maritalStatus: value.maritalStatus,
        bio: value.bio,
        active: value.active,
        dateBirth: value.dateBirth,
        favouriteColour: value.favouriteColour,
        favouriteSport: value.favouriteSport,
        schoolDream: value.schoolDream,
        hobby: value.hobby,
        phone: value.phone,
        position: value.positions,
        token: sessionStorage.getItem('accessToken'),
        children: value.children,
        phones: value.phones
    };
    return result;
}

// export function setFirstProfileData(data) {
//     debugger
//     const result = {
//         id: data.id,
//         fio: data.fio,
//         email: data.email,
//         gender: data.gender,
//         maritalStatus: value.maritalStatus,
//         bio: value.bio,
//         active: value.active,
//         dateBirth: value.dateBirth,
//         favouriteColour: value.favouriteColour,
//         favouriteSport: value.favouriteSport,
//         schoolDream: value.schoolDream,
//         hobby: value.hobby,
//         phone: value.phone,
//         position: value.positions,
//         token: sessionStorage.getItem('accessToken'),
//         children: value.children,
//         phones: value.phones
//     };
//     return result;
// }

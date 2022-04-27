var idUsers = []
$(document).ready(function () {
    SelectUser()
})

async function SelectUser() {
    await $.ajax({
        type: 'GET',
        url: 'http://localhost:3333/api/users',
        success: function (result) {
            idUsers = []
            $.each(result, function (i, users) {
                var day = dayjs(users.create_at).format('DD/MM/YYYY HH:mm:ss')
                $('tbody').append(`<tr class="tr${i}">
                <td>${i+1}</td>
                <td>${users.name}</td>
                <td>${users.last_name}</td>
                <td>${day}</td>
                <td>
                <a class="btn btn-warning edit${i}" title="Edit user" onclick="editUser(${i})"
                data-bs-toggle="modal" data-bs-target="#modal-edit"><strong>Edit</strong>
                </a>
                <a class="btn btn-danger delete${i}" title="Delete user" onclick="deleteUser(${i})"
                data-bs-toggle="modal" data-bs-target="#modal-delete"><strong>Delete</strong></a>
                </td>`)
                idUsers.push(users.idusers)
            });
        },
        error: function (err) {
            console.log(err);
        }
    })
}

$(document).on('submit','#add-user', async function(e) {
    await e.preventDefault()

    await $.ajax({
        type: $( this ).attr( 'method' ),
        url: $( this ).attr( 'action' ),
        data: $(this).serialize(),
        dataType: "json",
        encode: true,
        success: async function () {
            //DO some thing
            $('tbody tr').remove()
            $('.add-name').val('')
            $('.add-lastname').val('')
            await SelectUser()
        },
        error: function (err) {
            console.log(err);
        }
    })
})

async function editUser(i){
    var name = $(`.tr${i} td:eq(1)`).text()
    var lastName = $(`.tr${i} td:eq(2)`).text()
    $('.edit-name').val(name)
    $('.edit-lastname').val(lastName)
    $('.hiddenValue').remove()
    $('#edit-user').append(`<input type="hidden" class="hiddenValue" value="${i}">`)
}

$(document).on('submit','#edit-user', async function(e) {
    await e.preventDefault()

    var id =  idUsers[$('.hiddenValue').val()]
    var formData ={
        name: $('.edit-name').val(),
        last_name: $('.edit-lastname').val(),
        id: id
    }
    

    await $.ajax({
        type: 'PUT',
        url: $( this ).attr( 'action' ),
        data: formData,
        dataType: "json",
        encode: true,
        success: function () {
            //DO some thing
            $('tbody tr').remove()
            SelectUser()
            
        },
        error: function (err) {
            console.log(err);
        }
    })
})

function hide_modal(){
    $('#modal-delete').delay(500).fadeOut(200, function () {
        $(this).modal('hide');
    }); 
} 

function deleteUser(i) {
    var name = $(`.tr${i} td:eq(1)`).text()
    var lastName = $(`.tr${i} td:eq(2)`).text()
    $('.delete-name').attr('value',name)
    $('.delete-lastname').attr('value',lastName)
    $('.hiddenValue').remove()
    $('#delete-user').append(`<input type="hidden" class="hiddenValue" value="${i}">`)
}

$(document).on('submit','#delete-user', async function(e) {
    await e.preventDefault() 
    hide_modal()
    var id =  idUsers[$('.hiddenValue').val()]
    var formData = {
        id: id
    }

    await $.ajax({
        type: 'DELETE',
        url: $( this ).attr( 'action' ),
        data: formData,
        dataType: "json",
        encode: true,
        success: async function () {
            //DO some thing
            $('tbody tr').remove()
            await SelectUser()
        },
        error: function (err) {
            console.log(err);
        }
    })
})

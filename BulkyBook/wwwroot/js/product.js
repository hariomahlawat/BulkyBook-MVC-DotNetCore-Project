var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#productTable').DataTable({
        "ajax": {
            "url":"/Admin/Product/GetAll"
        },
        "columns": [
            { "data": "title", "width": "15%" },
            { "data": "isbn", "width": "15%" },
            { "data": "price", "width": "15%" },
            { "data": "author", "width": "15%" },
            { "data": "category.name", "width": "15%" },
            { "data": "coverType.name", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                           <div class="w-150 btn-group" role="group">
                        <a href="/Admin/Product/Upsert?id=${data}" class="btn btn-primary mx-2">
                            <i class="fa-solid fa-pencil"></i> Edit</a>
                        <a onClick=Delete('/Admin/Product/Delete/'+${data})  class="btn btn-danger mx-2">
                            <i class="fa-solid fa-trash "></i> Delete</a>
                    </div>
                    `
                },
                "width": "40%"
            }
        ]
    });
} 


function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                        
                    } else {
                        toastr.error(data.message);
                    }   
                }
            })
        }
    })
}
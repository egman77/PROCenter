﻿window.procenter.InitializeStaff = function (staffBaseUri, staffDataTableUri, teamBaseUri, teamApiBaseUri, updateTableSizes, checkDisabled, canAccessStaffEdit) {

    var initiateAssignRoleAjaxLinks = function () {
        var $container = $('#roles-container');
        $("#add-roles-btn").ajaxLink({
            url: staffBaseUri + '/AddRoles/',
            success: function () {
                $container.attr("data-ajax-status", "success");
                $("#available-roles > option:selected").each(function () {
                    $(this).remove().appendTo("#current-roles");
                });
                $("#available-roles").change();
                $("#current-roles").change();
            },
            getData: function () {
                $container.attr("data-ajax-status", "loading");
                var data = {};
                data["roleKeys"] = new Array();
                $('#available-roles option:selected').each(function () {
                    data["roleKeys"].push(this.value);
                });
                if (data["roleKeys"].length == 0) {
                    return false;
                }
                return data;
            },
            complete: function () {
                setTimeout(function () { $container.removeAttr("data-ajax-status"); }, 8000);
            },
            error: function () {
                $container.attr("data-ajax-status", "fail");
            }
        });
        $("#remove-roles-btn").ajaxLink({
            url: staffBaseUri + '/RemoveRoles/',
            success: function () {
                $container.attr("data-ajax-status", "success");
                $("#current-roles > option:selected").each(function () {
                    $(this).remove().appendTo("#available-roles");
                });
                $("#available-roles").change();
                $("#current-roles").change();
            },
            getData: function () {
                $container.attr("data-ajax-status", "loading");
                var data = {};
                data["roleKeys"] = new Array();
                $('#current-roles option:selected').each(function () {
                    data["roleKeys"].push(this.value);
                });
                if (data["roleKeys"].length == 0) {
                    return false;
                }
                return data;
            },
            complete: function () {
                setTimeout(function () { $container.removeAttr("data-ajax-status"); }, 8000);
            },
            error: function () {
                $container.attr("data-ajax-status", "fail");
            }
        });
    };
    var initializeStaffEditor = function () {
    
        var $staffEditor = $('.staff-editor');
        var staffKey = $('#current-staff-key').val();

        $staffEditor.ajaxForm({
            url: staffBaseUri + '/Edit/' + staffKey,
            validate: true,
            success: function () {
            }
        });

        initiateAssignRoleAjaxLinks();

        $("#create-account-btn").ajaxLink({
            url: staffBaseUri + '/CreateAccount/' + staffKey,
            success: function (data) {
                var $account = $('#system-account-content');
                $('#createAccountModal').modal("hide");
                $account.html(data);
                $('#system-account-content .system-account').find(":input").prop('disabled', true);
                initiateAssignRoleAjaxLinks();
            },
            error: function (jqXhr) {
                var $error = $('#system-account-content div.field-validation-error');
                $error.removeClass('hidden');
                $error.html(jqXhr.statusText);
            },
            getData: function () {
                var data = {};
                var valid = true;
                $('#createAccountModal').find('.modal-body :input').each(function () {
                    data[this.name] = this.value;
                    valid = valid & $(this).valid();
                });

                if (!valid) {
                    return false;
                }
                return data;
            }
        });

        $('#createAccountModal').on("hidden", function () {
            $('#system-account-content div.field-validation-error').addClass('hidden');
        });

        $('#createAccountModal').on('show', function () {
            $('#createAccountModal #systemAccount_Email').val($('#Email').val());
        });

        $('#link-account-btn').on('click', function () {
            $("#link-account-btn").ajaxLink({
                url: staffBaseUri + '/LinkAccount/' + staffKey,
                success: function (data) {
                    var $account = $('#system-account-content');
                    $('#linkAccountModal').modal("hide");
                    $account.html(data);
                    $('#system-account-content .system-account').find(":input").prop('disabled', true);
                    initiateAssignRoleAjaxLinks();
                },
                error: function (jqXhr) {
                    var $error = $('#system-account-content div.field-validation-error');
                    $error.removeClass('hidden');
                    $error.html(jqXhr.statusText);
                },
                getData: function () {
                    var data = {};
                    var valid = true;
                    $('#linkAccountModal').find('.modal-body :input').each(function () {
                        data[this.name] = this.value;
                        valid = valid & $(this).valid();
                    });

                    if (!valid) {
                        return false;
                    }
                    return data;
                }
            });
        });

        $('#linkAccountModal').on("hidden", function () {
            $('#system-account-content div.field-validation-error').addClass('hidden');
        });

        $('#linkAccountModal').on('show', function () {
            $('#linkAccountModal #systemAccount_Email').val($('#Email').val());
        });

        $('#system-account-content').on('change', '#available-roles', function () {
            if ($("#available-roles :selected").length > 0) {
                $("#add-roles-btn").removeClass("disabled");
            } else {
                $("#add-roles-btn").addClass("disabled");
            }
        });

        $('#system-account-content').on('change', '#current-roles', function () {
            if ($("#current-roles :selected").length > 0) {
                $("#remove-roles-btn").removeClass("disabled");
            } else {
                $("#remove-roles-btn").addClass("disabled");
            }
        });

        var addTeams = function (teams) {
            var $list = $('#staff-editor .current-teams');
            var listItems = '';
            for (var i = 0; i < teams.length; i++) {
                var team = teams[i];
                if ($list.html().indexOf(team.Key) == -1) {
                    listItems += '<li id=' + team.Key + '><span>' + team.Name + '</span><a data-icon="&#xe0a7;" class="remove-btn"></a><div class="modal-loading-indicator hidden"></div></li>';
                }
            }
            if (listItems.length > 0) {
                $list.html($list.html() + listItems);
            }
        };

        $.getJSON(teamApiBaseUri + '/GetByStaffKey?staffKey=' + staffKey, function (results) {
            addTeams(results);
        }).fail(function (error) {

        });

        $('#staff-editor .current-teams').on('click', '.remove-btn', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            var listItem = $(this).parent();
            var id = listItem[0].id;
            var $loader = listItem.find('.modal-loading-indicator').show();
            var staffKeysArray = new Array();
            staffKeysArray.push(staffKey);
            $.ajax({
                type: "POST",
                url: teamBaseUri + '/RemoveStaff/' + id,
                data: { staffKeysToRemove: staffKeysArray },
                traditional: true
            }).done(function () {
                listItem.remove();
            }).fail(function () {
                alert('Server error please retry.');
            })
              .always(function () { $loader.hide(); });
        });

        $('#staff-editor .teams').on('selectionChanged', function (evt, data) {
            if (data && $('#' + data.Key).length === 0) {
                $('#staff-editor .teams .add-btn').removeAttr("disabled").attr("href", teamBaseUri + '/AddStaff/' + data.Key);
            } else {
                $('#staff-editor .teams .add-btn').attr("disabled", "disabled");
            }
        });

        $('#staff-editor .teams .add-btn').ajaxLink({
            getData: function () {
                var staffGuids = new Array();
                staffGuids.push(staffKey);
                return { staffKeysToAdd: staffGuids };
            },
            success: function () {
                var finder = $('#staff-editor .teams [data-control="finder"]').finder();
                var team = finder.selectedData;
                addTeams([team]);
                finder.clearSelected();
            }
        });
    };

    $("#create-staff-btn").ajaxLink({
        getData: function () {
            var data = {};
            var isValid = true;
            $('#createStaffModal').find('.modal-body :input').each(function () {
                data[this.name] = this.value;
                isValid = isValid & $(this).valid();
            });
            if (!isValid) {
                return false;
            }
            return data;
        },
        success: function (data) {
            showStaffEditor(data);
            $('#createStaffModal').modal("hide");
        }
    });

    $('#createStaffModal').on('hidden', function () {
        $('#createStaffModal>form').find(':input').each(function() {
            $(this).val('');
        });
    });

    var staffSearchTable = $('#staffSearchDataTable').dataTable({
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        "sPaginationType": "bootstrap",
        "sScrollY": "100%",
        "sScrollX": "100%",
        "sScrollXInner": "100%",
        "bScrollCollapse": true,
        "bAutoWidth": true,
        "bProcessing": true,
        "bServerSide": true,
        "bSort": false,
        "sAjaxSource": staffDataTableUri,
        "aoColumns": [
            {
                "mData": "Name.FirstName",
                "sClass": "FirstColumn",
            },
            {
                "mData": "Name.LastName",
            },
            {
                "mData": "Email",
            },
            {
                "mData": "Location",
            },
            {
                "mData": "NPI",
            },
            {
                "mData": "Key",
                "sClass": "LastColumn",
                "bSortable": false,
                "bSearchable": false,
                "fnRender": function(oObj) {
                    var icon = '&#xe005;';
                    var text = "Edit";
                    var description = text + " staff " + oObj.aData.Name.FirstName + " " + oObj.aData.Name.LastName;
                    return "<div>" +
                        "<button type='button' aria-label='" + description + "' class='btn btn-mini btn-info edit-staff' id='" + oObj.aData.Key +
                        "' data-id='" + oObj.aData.Key + "' data-fullname='" + oObj.aData.Name.LastName + " " + oObj.aData.Name.FirstName + 
                        "' data-icon='" + icon + "'>" + text +
                        "</button>" +
                        "</div>";
                }
            }
        ],
        "fnDrawCallback": function () {
            updateTableSizes();
            if (canAccessStaffEdit) {
                $("button.edit-staff").click(function () {
                    var key = $(this).attr("data-id");
                    $.get(staffBaseUri + '/Edit/' + key, showStaffEditor);
                });
            }
        }
    });

    var showStaffGrid = function (widget) {
        $(widget).find('#staff-editor').hide();
        $(widget).find('#staff-editor').html('');
        $(widget).find('#staff-table').show();
        staffSearchTable.fnDraw();
    };

    var showStaffEditor = function (innerHtml) {
        var $widget = $('#staff-widget');
        $widget.find('#staff-editor').html(innerHtml);
        $widget.find('[data-control=finder]').finder();
        $.validator.unobtrusive.parse('#staff-editor'); // to re-initiate unobtrusive validation
        initializeStaffEditor();
        $('.dashboard-wrapper').dashboard('expand', $widget[0], showStaffGrid);
        $widget.find('#staff-editor').show();
        $widget.find('.dataTable_wrapper').hide();

        $(".system-account-lock").ajaxLink({
            success: function (data, $link) {
                $link.text(data.text);
                $link.attr('href', data.location);
            }
        });

        $(".system-account-reset-password").ajaxLink({
            type: 'POST',
            success: function (data) {
                if (data) {
                    if (data.Data.text != "" || data.Data.error != "") {
                        var msg = data.Data.text + data.Data.error;
                        $('#messageModal .modal-body').text(msg);
                        $("#messageModal").modal("show");
                    }
                }
            },
            error: function () {
            }
        });

        checkDisabled();

        $('#NPI').attr('maxLength', '10').on('keypress', function (e) {
            var charCode = e.which || e.keyCode;
            if (charCode > 31 && (charCode <= 47 || charCode > 57))
                return false;
            if (e.shiftKey) return false;
            return true;
        });

        $("#NPI").rules("add", {
            required: false,
            minlength: 10
        });
    };
}
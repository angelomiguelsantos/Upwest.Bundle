(function () {
    'use strict';    

    function timeLineController($http, $scope, assetsService, $routeParams, userService) {

        var grid, timeline;        
        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;
        $scope.loading = true;
        var memberId=0;
        var contentId = 0;   
        var userId = 0; 
        var culture = "en-us";
        var backofficeCulture = "en-us";

        if ($routeParams.tree == "memberTypes") {
            memberId = $routeParams.id;
        }
        else {            
            contentId = $routeParams.id;
        }

        if ($routeParams.cculture) {
            culture = $routeParams.cculture;
        }

        userService.getCurrentUser().then(function (user) {

            var localeScript;
            var jsToload = [];
            jsToload.push("~/App_Plugins/upwest.timeLine/dependencies/timeline.js");

            if (user.locale.toLowerCase() != "en-us") {
                localeScript = "~/App_Plugins/upwest.timeLine/dependencies/messages/messages." + user.locale.toLowerCase() + ".min.js";
            }

            if (localeScript) {
                $.get(localeScript)
                    .done(function () {
                        backofficeCulture = user.locale.toLowerCase();
                        jsToload.push(localeScript);
                    });
            }

            assetsService
                .load(jsToload)
                .then(function () {
                        if ($scope.model.config.eventsPerUser == 1) {
                            userId = user.id;
                            memberId = 0;
                            contentId = 0;
                        }

                        $http({
                            url: "/umbraco/backoffice/api/TimeLine/GetDataForTimeLine",
                            method: "GET",
                            params: {
                                contentId: contentId,
                                userId: userId,
                                memberId: memberId,
                                culture: culture,
                                alias: vm.alias
                            }
                        })
                        .then(function success(data) {

                            vm.removeallTranslation = data.data.removeallTranslation;
                            vm.addeventTranslation = data.data.addeventTranslation;
                            vm.titleTranslation = data.data.titleTranslation;
                            vm.dateTranslation = data.data.dateTranslation;
                            vm.selectedTranslation = data.data.selectedTranslation;
                            vm.translateTranslation = data.data.translateTranslation;
                            
                            vm.failedtodeleteTranslation = data.data.failedtodeleteTranslation;
                            vm.saveTranslation = data.data.saveTranslation;
                            vm.rowsperpageTranslation = data.data.rowsperpageTranslation;
                            vm.addeventTranslation = data.data.addeventTranslation;
                            vm.cancelTranslation = data.data.cancelTranslation;
                            vm.selectedTranslation = data.data.selectedTranslation;

                            var dateGridFormat;
                            
                            if ($scope.model.config.timePicker == 1) {
                                dateGridFormat = $scope.model.config.format.toLowerCase() + ' HH:MM';
                            }
                            else {
                                dateGridFormat = $scope.model.config.format.toLowerCase();
                            }

                            grid = $('#grid' + vm.alias).grid({
                                params: {
                                    contentId: contentId,
                                    userId: userId,
                                    memberId: memberId,
                                    culture: culture,
                                    alias: vm.alias
                                },
                                dataSource: '/umbraco/backoffice/api/TimeLine/GetDataForGrid',
                                primaryKey: 'id',
                                iconsLibrary: 'fontawesome',
                                uiLibrary: 'bootstrap',
                                rowReorder: true,
                                locale: backofficeCulture,
                                columns: [
                                    { field: 'date', sortable: true, type: 'date', format: dateGridFormat, title: vm.dateTranslation },
                                    { field: 'title', title: vm.titleTranslation, sortable: true, },
                                    { field: 'content', title: data.data.contentTranslation, sortable: true },
                                    { field: 'isSelected', title: vm.selectedTranslation, type: 'checkbox', width: 130, align: 'center', sortable: true },
                                    { width: 64, tmpl: '<span class="material-icons gj-cursor-pointer">' + data.data.editTranslation + '</span>', align: 'center', events: { 'click': edit } },
                                    { width: 64, tmpl: '<span class="material-icons gj-cursor-pointer">' + data.data.deleteTranslation + '</span>', align: 'center', events: { 'click': remove } }
                                ],
                                pager: { limit: 5 },
                                selectionMethod: 'checkbox',
                                selectionType: 'multiple'
                            });

                            function edit(e) {                              

                                $('#id' + vm.alias).val(e.data.record.id);
                                $('#title' + vm.alias).val(e.data.record.title);                            
                                $('#content' + vm.alias).val(e.data.record.content);
                                $('#isSelected' + vm.alias).prop('checked', e.data.record.isSelected);
                                $('#translate' + vm.alias).prop('checked', false);
                                $('#dialog' + vm.alias).fadeIn();
                                setCalendar(e.data.record.date);
                            }

                            function setCalendar(value) {
                                setTimeout(function () {
                                    if ($scope.model.config.timePicker == 1) {
                                        $('#date' + vm.alias).datetimepicker({
                                            footer: true,
                                            modal: false,
                                            uiLibrary: "bootstrap",
                                            iconsLibrary: 'fontawesome',
                                            value: value,
                                            format: $scope.model.config.format.toLowerCase() + ' HH:MM',
                                            locale: backofficeCulture
                                        });
                                    }
                                    else {
                                        $('#date' + vm.alias).datepicker({
                                            footer: true,
                                            modal: false,
                                            uiLibrary: "bootstrap",
                                            iconsLibrary: 'fontawesome',
                                            value: value,
                                            format: $scope.model.config.format.toLowerCase(),
                                            locale: backofficeCulture
                                        });
                                    }
                                
                                    $("[role='clockMode']").html("");                                    
                                    $("[role='calendarMode']").html("");

                                }, 1);
                            }


                            $('#btnAdd' + vm.alias).on('click', function () {
                                $('#id' + vm.alias).val('');      
                                $('#title' + vm.alias).val('');
                                $('#content' + vm.alias).val('');
                                $('#isSelected' + vm.alias).prop('checked', false);
                                $('#translate' + vm.alias).prop('checked', false);
                                setCalendar("");
                                $('#dialog' + vm.alias).fadeIn();
                            });

                            function save(e) {

                                e.preventDefault();                            

                                var event = {
                                    id: $('#id' + vm.alias).val(),
                                    date: $('#date' + vm.alias).val(),
                                    title: $('#title' + vm.alias).val(),
                                    content: $('#content' + vm.alias).val(),
                                    contentId: contentId,
                                    userId: userId,
                                    memberId: memberId,
                                    image: "",
                                    culture: culture,
                                    isSelected: $('#isSelected' + vm.alias).prop('checked'),
                                    translate: $('#translate' + vm.alias).prop('checked'),
                                    alias: vm.alias
                                };

                                $.ajax({
                                    url: '/umbraco/backoffice/api/TimeLine/Save',
                                    data: event,
                                    method: 'POST',
                                    dataType: "json",
                                    beforeSend: function () {
                                        $("#btnSave" + vm.alias).html("<i class=\"fa fa-circle-o-notch fa-spin\"></i>");
                                    },
                                })
                                .done(function () {
                                    $("#btnSave" + vm.alias).html("Ok");
                                    $('#dialog' + vm.alias).fadeOut();
                                    grid.reload();
                                    reloadTimeline();
                                })
                                .fail(function () {
                                    $("#btnSave" + vm.alias).html("Ok");
                                    alert(data.data.failedtosaveTranslation);
                                    $('#dialog' + vm.alias).fadeOut();
                                });
                            }

                            function remove(e) {
                                if (confirm(data.data.areyousureTranslation + " ?")) {
                                    $.ajax({
                                        url: '/umbraco/backoffice/api/TimeLine/Remove',
                                        data: {
                                            id: e.data.id
                                        },
                                        method: 'POST'
                                    })
                                        .done(function () {
                                            grid.reload();
                                            reloadTimeline();
                                        })
                                        .fail(function () {
                                            alert(vm.failedtodeleteTranslation);
                                        });
                                }
                            }

                            function reloadTimeline() {
                                $http({
                                    url: "/umbraco/backoffice/api/TimeLine/GetDataForTimeLine",
                                    method: "GET",
                                    params: {
                                        contentId: contentId,
                                        userId: user.id,
                                        memberId: memberId,
                                        culture: culture
                                    }
                                })
                                    .then(function success(data) {
                                        timeline.roadmap(data.data.timelineEvents, {
                                            eventsPerSlide: $scope.model.config.eventsPerSlide,
                                            slide: $scope.model.config.slide,
                                            prevArrow: '<i class="fa fa-arrow-left"></i>',
                                            nextArrow: '<i class="fa fa-arrow-right"></i>'
                                        });
                                    });
                            }

                            function removeAll() {

                                var ids = grid.getSelections();

                                if (ids.length == 0) {
                                    alert(data.data.pleaseselectatleastonerowTranslation);
                                    return;
                                }

                                var r = confirm(data.data.areyousureTranslation + " ?");

                                if (!r) {
                                    return;
                                }

                                if (r) {

                                    var deleteTranslations = confirm(data.data.doyouwanttodeletealltherowsonotherlanguagesTranslation + " ?");

                                    var ids = grid.getSelections();
                                    $.ajax({
                                        url: '/umbraco/backoffice/api/TimeLine/RemoveAll',
                                        data: {
                                            ids: "'" + ids + "'",
                                            deleteTranslations: deleteTranslations,
                                            contentId: contentId,
                                            userId: userId,
                                            memberId: memberId,                                        
                                            culture: culture,                                        
                                            alias: vm.alias
                                        },
                                        method: 'POST',
                                        beforeSend: function () {

                                        }
                                    })
                                    .done(function () {
                                        grid.reload();
                                        reloadTimeline();
                                    });
                                }
                            }

                            $('#btnSave' + vm.alias).on('click', save);
                            $('#btnRemoveAll' + vm.alias).on('click', removeAll);
                            $('#btnClose' + vm.alias).on('click', function (e) {
                                e.preventDefault();
                                $('#dialog' + vm.alias).fadeOut();
                            
                            });                        

                            var manageOpened = false;
                            $('#manage' + vm.alias).on('click', function () {
                                if (!manageOpened) {
                                    $(this).animate({ height: 800 });
                                    manageOpened = true;
                                }
                                else {
                                    $(this).animate({ height: 20 });
                                    manageOpened = false;
                                }
                            });


                            timeline = $('#' + vm.alias).roadmap(data.data.timelineEvents, {
                                eventsPerSlide: $scope.model.config.eventsPerSlide,
                                slide: $scope.model.config.slide,
                                orientation: $scope.model.config.orientation,
                                prevArrow: '<i class="fa fa-arrow-left"></i>',
                                nextArrow: '<i class="fa fa-arrow-right"></i>'
                            }); 
                        });
             });     
        });
    }    

    angular.module('umbraco').controller('TimeLine', timeLineController);

})();

















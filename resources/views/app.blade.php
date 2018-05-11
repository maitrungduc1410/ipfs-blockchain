@extends('layouts.base')

@section('body')
	<div id="app">
		<router-view></router-view>
	</div>
@endsection

@push('styles')
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css" rel="stylesheet">
    <link href="/css/lib/pe-icon-7-stroke.min.css" rel="stylesheet"/>
    <link href="/css/lib/light-bootstrap-dashboard.min.css" rel="stylesheet"/>
    <link href="/css/app.css" rel="stylesheet">
	<script src="http://d3js.org/d3.v3.min.js"></script>
	<script src="http://d3js.org/topojson.v1.min.js"></script>
	<script src="/js/globe/planetaryjs.min.js"></script>
@endpush

@push('scripts')
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src="/js/app.js"></script>
	<script src="/js/lib/light-bootstrap-dashboard.js"></script>
	{{-- <script src="/js/globe/globe.js"></script> --}}
@endpush
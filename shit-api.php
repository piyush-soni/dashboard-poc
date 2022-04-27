<?php

/**
* Plugin Name: shit_api
*/

function order_data(){
	global $wpdb;
	$table = $wpdb->prefix . 'wc_order_stats';
	$temp = $wpdb->get_results(
		$wpdb->prepare(
			"select order_id, date_created, net_total, status from {$table};"
		),
		ARRAY_A
	);
	return $temp;
}

function sales_data(){
	global $wpdb;
	$table = $wpdb->prefix . 'wc_order_stats';
	$temp = $wpdb->get_results(
		$wpdb->prepare(
			"select sum(total_sales) as Sales from {$table} where status = 'wc-completed'"
		),
		ARRAY_A
	);
	return $temp;
}

function chart_data(){
	global $wpdb;
	$table = $wpdb->prefix . 'wc_order_stats';
	$temp = $wpdb->get_results(
		$wpdb->prepare(
			"select status, count(status) as status_count from {$table} group by status"
		),
		ARRAY_A
	);
	return $temp;
}

function customer_data(){
	global $wpdb;
	$table = $wpdb->prefix . 'wc_customer_lookup';
	$temp = $wpdb->get_results(
		$wpdb->prepare(
			"select count(customer_id) as Unique_Customers from {$table};"
		),
		ARRAY_A
	);
	return $temp;
}

function datevsales_data(){
	global $wpdb;
	$table = $wpdb->prefix . 'wc_order_stats';
	$temp = $wpdb->get_results(
		$wpdb->prepare(
			"select cast(date_created as date) as date_created_new, sum(total_sales) as sales from {$table} group by date_created_new"
		),
		ARRAY_A
	);
	return $temp;
}

function ordervsales_data(){
	global $wpdb;
	$table = $wpdb->prefix . 'wc_order_product_lookup';
	$temp = $wpdb->get_results(
		$wpdb->prepare(
			"select cast(date_created as date) as date_created_new, count(distinct(order_id)) as total_orders from {$table} group by date_created_new"
		),
		ARRAY_A
	);
	return $temp;
}

function table_data(){
	global $wpdb;
// 	$table = $wpdb->prefix . 'woocommerce_api_keys';
// 	$table = $wpdb->prefix . 'woocommerce_sessions';
	$temp = $wpdb->get_results(
		$wpdb->prepare(
// 			"select * from {$table}"
			"SELECT TABLE_NAME  FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"
		),
		ARRAY_A
	);
	return $temp;
}

function useless_data($data){
	global $wpdb;
	$table = $data->get_param('name');
	$temp = $wpdb->get_results(
		$wpdb->prepare(
			"select * from {$table}"
		),
		ARRAY_A
	);
	return $temp;
}

add_action('rest_api_init', function(){
	register_rest_route('order','data',[
		'methods' => 'GET',
		'callback' => 'order_data',
	]);
	register_rest_route('sales','data',[
		'methods' => 'GET',
		'callback' => 'sales_data',
	]);
	register_rest_route('chart','data',[
		'methods' => 'GET',
		'callback' => 'chart_data',
	]);
	register_rest_route('customer','data',[
		'methods' => 'GET',
		'callback' => 'customer_data',
	]);
	register_rest_route('datevsales','data',[
		'methods' => 'GET',
		'callback' => 'datevsales_data',
	]);
	register_rest_route('ordervsales','data',[
		'methods' => 'GET',
		'callback' => 'ordervsales_data',
	]);
	register_rest_route('table','data',[
		'methods' => 'GET',
		'callback' => 'table_data',
	]);
	register_rest_route('useless','data',[
		'methods' => 'GET',
		'callback' => 'useless_data',
	]);
});
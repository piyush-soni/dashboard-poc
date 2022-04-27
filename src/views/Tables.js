import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
	const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function loadPosts(){
      const res = await fetch("https://woocommerce-112291-2486256.cloudwaysapps.com/wp-json/order/data");
      const temp = await res.json();
      setPosts(temp);
    }
    loadPosts();
  }, [])
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Order Details</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Order Id</th>
                      <th>Date Created</th>
                      <th>Status</th>
                      <th className="text-right">Total Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                  {posts.map((post, index) => 
                    <tr key={`${index}`}>
                      <td>{post.order_id}</td>
                      <td>{post.date_created}</td>
                      <td>{post.status}</td>
                      <td className="text-right">{post.net_total}</td>
                    </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;

import React, { useEffect, useState } from 'react';
import { Form, Input, message, Space, Card, Checkbox } from 'antd';
import { productDetails } from '../../redux/thunks/productThunk';
import { useDispatch, useSelector } from 'react-redux';
import "./product.scss";
import { BASE_URL } from '../../constants';
import Editor from '../../components/product/Editor';
import { Link, useParams } from 'react-router-dom';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const ViewProduct = () => {
    const dispatch = useDispatch();
    const [defaultOption, setDefaultOption] = useState([]);
    const productState = useSelector(state => state.product.data);

    const params = useParams()
    useEffect(() => {
        Fancybox.bind("[data-fancybox]", {

        });
        return () => {
            Fancybox.destroy();
        };
    }, []);
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await dispatch(productDetails(params.productId));
                if (res.payload.success) {
                    message.success(res.payload.message);
                    handleDefaultOption(res.payload);
                } else {
                    if (res.payload.errors) {
                        res.payload.errors.forEach((err) => {
                            message.error(err.msg);
                        });
                    } else {
                        message.error(res.payload.message);
                    }
                }
            } catch (err) {
                message.error(err.message);
            }
        };

        if (params.productId) {
            fetchProductDetails();
        }
    }, [dispatch, params.productId]);
    const options = [
        {
            label: 'Hot Deal',
            value: 'hotDeal',
            disabled: true,
        },
        {
            label: 'Best Rated',
            value: 'bestRated',
            disabled: true,
        },
        {
            label: 'Hot New',
            value: 'hotNew',
            disabled: true,
        },
        {
            label: 'Trend',
            value: 'trend',
            disabled: true,
        },
    ];
    const handleDefaultOption = ({ data }) => {
        const arr = [];
        const { hotNew, hotDeal, bestRated, trend } = data || {};
        if (hotNew) arr.push('hotNew');
        if (hotDeal) arr.push('hotDeal');
        if (bestRated) arr.push('bestRated');
        if (trend) arr.push('trend');
        setDefaultOption(arr)
    };
    return (
        <div className="row">
            <Form
                layout="vertical"
                autoComplete="off"
                className="col-md-12"
            >
                <div className='row'>
                    <div className='col-md-8 mb-3'>
                        <Space direction="vertical" size={20}>
                            <Card title="View New Product">
                                <Form.Item
                                    label="Product Title"
                                    size="large"
                                    hasFeedback
                                >
                                    <Input placeholder="Please enter Product name" disabled={true} value={productState.data?.name} />
                                </Form.Item>

                                <Form.Item
                                    label="Product Description"
                                    size="large"
                                    hasFeedback
                                >
                                    <Editor data={productState.data?.description} disabled={true} />
                                </Form.Item>
                                <Form.Item

                                    label="Product Short Description"
                                    size="large"

                                >
                                    <Editor data={productState.data?.shortDescription} disabled={true} />
                                </Form.Item>
                                <Space direction="horizontal">
                                    <Form.Item
                                        label="Select Brand"
                                        size="large"
                                    >
                                        <Input placeholder="Please enter Product name" disabled={true} value={productState.data?.brand.name} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Select Category"
                                        size="large"

                                    >
                                        <Input value={productState.data?.category?.name} disabled={true} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Select SubCategory"
                                        size="large"
                                    >
                                        <Input value={productState.data?.subCategory?.name} disabled={true} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Regular Price"
                                    >
                                        <Input value={productState.data?.regularPrice} disabled={true} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Selling Price"
                                    >
                                        <Input value={productState.data?.sellingPrice} disabled={true} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Quantity"
                                    >
                                        <Input value={productState.data?.quantity} disabled={true} />
                                    </Form.Item>
                                </Space>
                            </Card>
                        </Space>
                    </div>
                    <div className='col-md-4'>
                        <Space direction="vertical">
                            <Card title="Product Image" className='mb-3'>
                                <Form.Item
                                    label="Main Product Image"
                                    size={'large'}
                                >
                                    <Link
                                        data-fancybox="image"
                                        to={BASE_URL + productState.data?.image}
                                        data-caption={productState.data?.image}
                                    >
                                        <img src={BASE_URL + productState.data?.image} alt={productState.data?.image} width={80} height={80} />
                                    </Link>
                                </Form.Item>
                            </Card>

                            <Card title="Product Image Gallery" className='mb-3'>
                                <Form.Item
                                    label="Product Gallery Images"
                                    size={'large'}

                                >
                                    {
                                        productState.data?.gallery.map((image, idx) => {
                                            return (<>
                                                <Link
                                                    key={idx}
                                                    data-fancybox="gallery"
                                                    to={BASE_URL + image}
                                                    data-caption={image}
                                                >
                                                    <img src={BASE_URL + image} alt={image} width={80} height={80} />
                                                </Link>
                                            </>)
                                        })
                                    }
                                </Form.Item>
                            </Card>
                        </Space>
                        <Space direction='horizontal'>
                            <Card title="Promotions and Product Status" className='mb-3'>
                                <Form.Item
                                    label="Product Status"
                                    size={'large'}
                                    hasFeedback={true}
                                >
                                    <Checkbox.Group options={options} value={defaultOption} />
                                </Form.Item>
                            </Card>
                        </Space>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ViewProduct;

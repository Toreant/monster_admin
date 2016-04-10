/**
 * Created by apache on 16-4-10.
 */

var polyfill = require('babel-polyfill');
var should = require('should');
var requestAgent = require('supertest');
var express = require('express');
var request = requestAgent("http://localhost:8080");

describe('notice',function() {
    describe('#postNoticeAll',function() {
        it('it should be response json',function() {
            request
                .post('/api/notice/all')
                .type('application/json;charset=utf-8')
                .send(JSON.stringify({
                    query : {},
                    content : {
                        create_time : new Date().getTime(),
                        content : '测试',
                        type : 0
                    }
                }))
                .expect(200,{
                    meta : '发送成功',
                    code : 200
                })
                .end(function(err,res) {
                    done(err);
                })
        });
    });
});
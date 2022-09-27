import headersMiddleware from '../../backend/lib/headers';
import { NextFunction, Request, Response } from 'express';
jest.mock("react-relay-network-modern/node8");

describe("The headers middleware", () => {
  test('should add necessary headers to response', () => {
    const mockRequest = {};
    const mockResponse = {
      
      append: jest.fn(),
      setHeader: jest.fn(),
      removeHeader: jest.fn(),
      json: jest.fn()
    }
    const nextFunction = jest.fn();

    const middleware = headersMiddleware();
    middleware(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.append).toBeCalledWith("X-Frame-Options", "SAMEORIGIN");
    expect(mockResponse.append).toBeCalledWith("X-Content-Type-Options", "nosniff");
    expect(mockResponse.append).toBeCalledWith("Content-Security-Policy", "default-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; frame-ancestors 'self'; form-action 'self'");
    expect(mockResponse.append).toBeCalledWith("Permissions-Policy", "display-capture 'none'");

    expect(mockResponse.removeHeader).toBeCalledWith("X-Powered-By");

  });
});
